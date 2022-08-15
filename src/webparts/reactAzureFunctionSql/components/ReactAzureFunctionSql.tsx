import * as React from 'react';
import styles from './ReactAzureFunctionSql.module.scss';
import { IReactAzureFunctionSqlProps } from './IReactAzureFunctionSqlProps';
import { IReactAzureFunctionSqlState } from './IReactAzureFunctionSqlState';
import { escape } from '@microsoft/sp-lodash-subset';
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { ListView, IViewField, SelectionMode } from '@pnp/spfx-controls-react/lib/controls/listView';

let itemId;
export default class ReactAzureFunctionSql extends React.Component<IReactAzureFunctionSqlProps, IReactAzureFunctionSqlState> {

  constructor(props: IReactAzureFunctionSqlProps, state: IReactAzureFunctionSqlState) {
    super(props);
    this.state = {
      customers: []
    };
  }

  // TODO: for production use, you should consider how to handle storage of this URL and auth code..
  protected functionUrl: string = "https://{Your Function Name}.azurewebsites.net/api/customer?code={ Your Code ...}";


  private _getCustumers(): Promise<any> {
    return this.props.httpclient
      .get(
        this.functionUrl,
        HttpClient.configurations.v1
      )
      .then((response: HttpClientResponse) => {
        return response.json();
      })
      .then(jsonResponse => {
        return jsonResponse;
      }) as Promise<any>;
  }

  private _viewFields: IViewField[] = [
    {
      name: "customerID",
      displayName: "Customer ID",
      maxWidth: 100,
      minWidth: 100,
      render: (item: any) => {
        const it = item["customerID"];
        if (it) {
          itemId = JSON.stringify(it);
          return <span>{it}</span>;
        }
      }
    },
    {
      name: "companyName",
      displayName: "Company Name",
      maxWidth: 500,
      render: (item: any) => {
        const it = item["companyName"];
        if (it) {
          itemId = JSON.stringify(it);
          return <span>{it}</span>;
        }
      }
    },
    {
      name: "contactName",
      displayName: "Contact Name",
      minWidth: 500,
      render: (item: any) => {
        const it = item["contactName"];
        if (it) {
          itemId = JSON.stringify(it);
          return <span>{it}</span>;
        }
      }
    }
  ];

  public componentDidMount() {
     this._getCustumers()
      .then(response => {
       
        this.setState({ customers: response });
      });
      
      console.log(this.state.customers);
  }

  public render(): React.ReactElement<IReactAzureFunctionSqlProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.reactAzureFunctionSql} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ListView
            items={this.state.customers}
            viewFields={this._viewFields}
            compact={true}
            selectionMode={SelectionMode.none}
            filterPlaceHolder={"Search..."}
            showFilter={true}
            iconFieldName="File.ServerRelativeUrl">
          </ListView>
        </div>
      </section>
    );
  }
}
