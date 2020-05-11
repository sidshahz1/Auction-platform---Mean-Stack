import { Routes } from "@angular/router";
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { BuyComponent } from './buy/buy.component';
import { SellComponent } from './sell/sell.component';
import { HelpComponent } from './help/help.component';

export const appRoutes: Routes = [
    {
        path:'home',component: DashboardComponent,canActivate:[AuthGuard]
    },
    {
        path: 'signup', component: UserComponent,
        children: [{path:'',component:SignUpComponent}],
    },
    {
        path: 'login', component: UserComponent,
        children: [{path:'',component:SignInComponent}],
    },
    {
        path: 'userprofile', component: DashboardComponent,canActivate:[AuthGuard],
        children: [{path:'',component:UserProfileComponent}]
    },
    {
        path: 'buy', component: DashboardComponent,canActivate:[AuthGuard],
        children: [{path:'',component:BuyComponent}]
    },
    {
        path: 'sell', component: DashboardComponent,canActivate:[AuthGuard],
        children: [{path:'',component:SellComponent}]
    },
    {
        path: 'help', component: DashboardComponent,canActivate:[AuthGuard],
        children: [{path:'',component:HelpComponent}]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];