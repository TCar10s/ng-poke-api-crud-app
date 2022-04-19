import { Component, Input, OnInit } from "@angular/core";
import { DashboardItem } from "../../../interfaces/dashboard.item.type";
import { DashboardComponent } from "../dashboard.component";

@Component({
  selector: "app-dashboard-box",
  templateUrl: "./dashboard-box.component.html",
  styleUrls: ["./dashboard-box.component.css"],
})
export class DashboardBoxComponent implements OnInit {
  @Input() public data: DashboardItem;
  @Input() public mainRef: DashboardComponent;
  public expanded = false;

  constructor() {}

  public ngOnInit(): void {
  }

  /**
   * changePanel
   */
  public changePanel() {
    this.expanded = !this.expanded;
  }
}
