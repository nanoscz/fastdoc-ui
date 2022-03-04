import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map, shareReplay, tap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { SessionService } from '../shared/services/session.service';

@Component({
  selector: 'app-shell-page',
  templateUrl: './shell-page.component.html',
  styleUrls: ['./shell-page.component.scss']
})
export class ShellPageComponent {
  pathNames = {
    orders: 'Pedidos',
    clients: 'Clientes',
    motorcyclists: 'Motociclista'
  };
  session$ = new BehaviorSubject<any>(null);
  currentRoute$ = new BehaviorSubject<string>('');
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.currentRoute$.next(this.router.url.split('/')[1]);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((route: NavigationEnd) => {
        const url = route.url.split('/')[1];

        return this.pathNames[url];
      })
    ).subscribe((url: string) => this.currentRoute$.next(url));
    this.session$.next(this.sessionService.getSession());
  }

  logout() {
    console.log('logout');
    this.sessionService.clearSession();
    this.router.navigate(['auth/login']);
  }
}
