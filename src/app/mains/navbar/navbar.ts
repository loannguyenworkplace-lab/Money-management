import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { RouterLink,RouterLinkActive } from "@angular/router";

@Component({
  selector: 'nav-bar-app',
  imports:[RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  constructor(
    private route: Router,
  ) { }
}
