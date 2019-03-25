import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  ResolveStart,
  ResolveEnd
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];

  navStart: Observable<NavigationStart>;
  navResStart: Observable<ResolveStart>;
  navResEnd: Observable<ResolveEnd>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
    this.menu.enable(true, 'sidebar');
    // Create a new Observable that publish
    // NavigationStart, ResolveStart, ResolveEnd
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>;
    this.navResStart = router.events.pipe(
      filter(evt => evt instanceof ResolveStart)
    ) as Observable<ResolveStart>;
    this.navResEnd = router.events.pipe(
      filter(evt => evt instanceof ResolveEnd)
    ) as Observable<ResolveEnd>;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.navStart.subscribe(evt => {
      console.log('navStart', evt);
      if (evt.url === '/login') {
        this.menu.enable(false, 'sidebar');
      }
    });
    this.navResStart.subscribe(evt => {
      console.log('navResStart', evt);
      if (evt.url === '/login') {
        this.menu.enable(false, 'sidebar');
      }
    });
    this.navResEnd.subscribe(evt => {
      console.log('navResEnd', evt);
      if (evt.url !== '/login') {
        this.menu.enable(true, 'sidebar');
      }
    });
  }
}
