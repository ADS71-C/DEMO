import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {LatestComponent} from './latest/latest.component';
import {StompConfig, StompService} from '@stomp/ng2-stompjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MongoService} from './mongo.service';

const stompConfig: StompConfig = <StompConfig>{
  url: 'ws://localhost:61613/ws',
  headers: {
    login: 'SMUG',
    passcode: 'rjVpKFy9TJ7ECqMQ3CCEbSWThdjC6SZa'
  },
  heartbeat_in: 0, // Typical value 0 - disabled
  heartbeat_out: 20000, // Typical value 20000 - every 20 seconds
  reconnect_delay: 5000,
  debug: true
};


@NgModule({
  declarations: [
    AppComponent,
    LatestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    StompService, {
      provide: StompConfig,
      useValue: stompConfig
    },
    MongoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
