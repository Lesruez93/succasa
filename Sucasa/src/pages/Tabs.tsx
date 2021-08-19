import React from 'react';
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from '@ionic/react';
import './Tab3.css';
import {Redirect, Route, Switch} from "react-router";
import Tab3 from "./Tab3";
import {apps, business, chatboxEllipses} from "ionicons/icons";
import PrivateRoute from "./PrivateRoute";
import Portfolio from "./portfolio/portfolio";
import Dashboard from "./dashboard/dashboard";
import NotFound from "./not-found";

const Tabs: React.FC = () => {
  return (

          <IonTabs>
              <IonRouterOutlet>

                  <PrivateRoute path="/tabs/dashboard" component={Dashboard} exact />
                  <PrivateRoute path="/tabs/portfolio" component={Portfolio} exact />
                  <PrivateRoute path="/tabs/chat" component={Tab3} exact />

                  <Route path="/" render={() => <Redirect to="/tabs/dashboard" />} exact={true} />
                  <Route  component={NotFound}/>

              </IonRouterOutlet>
              <IonTabBar slot="bottom">
                  <IonTabButton tab="dashboard" href="/tabs/dashboard">
                      <IonIcon icon={apps} />
                      <IonLabel>Dashboard</IonLabel>
                  </IonTabButton>


                  <IonTabButton tab="portfolio" href="/tabs/portfolio">
                      <IonIcon icon={business} />
                      <IonLabel>Portfolio</IonLabel>
                  </IonTabButton>


                  <IonTabButton tab="chat" href="/tabs/chat">
                      <IonIcon icon={chatboxEllipses} />
                      <IonLabel>Chat</IonLabel>
                  </IonTabButton>

                  {/*<IonTabButton tab="dashboard" href="/tabs/chat">*/}
                  {/*    <IonIcon icon={people} />*/}
                  {/*    <IonLabel>Tenants</IonLabel>*/}
                  {/*</IonTabButton>*/}
              </IonTabBar>
          </IonTabs>


  );
};

export default Tabs;
