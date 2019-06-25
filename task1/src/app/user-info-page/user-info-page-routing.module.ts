import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserInfoPageComponent } from './user-info-page.component';
 
const routes: Routes = [
    { path:"", component: UserInfoPageComponent }
];
 
@NgModule({
    exports: [RouterModule],
    imports:[RouterModule.forChild(routes)]
})
 
class UserInfoPageRoutingModule{};
export {UserInfoPageRoutingModule}