import { Component, Injectable, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Pokemon, ResultPokemon } from "src/app/interfaces/poke-api.interface";
import { PokeApiLsService } from "src/app/services/poke-api-ls.service";
import { PokeApiService } from "src/app/services/poke-api.service";
import { DashboardItem } from "../../interfaces/dashboard.item.type";
import { DashboardService } from "../../services/dashboard.service";
import { ToastService } from "../../services/toast.service";

const INITIAL_PAGINATOR_VALUE = {
  length: 0,
  pageIndex: 0,
  pageSize: 5,
};

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
@Injectable({
  providedIn: "root",
})
export class DashboardComponent implements OnInit {
  public elements: DashboardItem[] = [];

  public pokemons: Pokemon[] = [];

  public loading = false;
  public ngxLoadingAnimationTypes = {
    chasingDots: "chasing-dots",
    circle: "sk-circle",
    circleSwish: "circleSwish",
    cubeGrid: "sk-cube-grid",
    doubleBounce: "double-bounce",
    none: "none",
    pulse: "pulse",
    rectangleBounce: "rectangle-bounce",
    rotatingPlane: "rotating-plane",
    threeBounce: "three-bounce",
    wanderingCubes: "wandering-cubes",
  };

  constructor(
    private dashboardService: DashboardService,
    private toast: ToastService,
    private pokeApiService: PokeApiService,
    private pokeApiLsService: PokeApiLsService
  ) {}

  public ngOnInit() {
    this.getData().then();

    this.validatePokemonsExistence();
  }

  public validatePokemonsExistence(): void {
    const pokemons = JSON.parse(localStorage.getItem("pokemons"));

    if (!pokemons) {
      this.getListPokemons(INITIAL_PAGINATOR_VALUE);
    } else {
      this.pokemons = pokemons;
    }
  }

  public getListPokemons(event: PageEvent): void {
    this.pokeApiService.getListPokemons(event).then((response) => {
      const { results, count } = response;
      this.getPokemons(results);
      this.pokeApiLsService.saveTotalPokemons(count);
    });
  }

  public async getPokemons(results: ResultPokemon[]) {
    try {
      this.pokemons = await Promise.all(
        results.map((result) => this.pokeApiService.getPokemon(result.url))
      );

      this.pokeApiLsService.addPokemonsLocalStorage(this.pokemons);
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * getMetrics
   */
  public async getData() {
    try {
      this.loading = true;
      this.elements = await this.dashboardService.getNewDashboardData();
      this.loading = false;
    } catch (e) {
      console.log(e);
      this.toast.error(
        "No se pudieron obtener los indicadores del dashboard, revise su conexión"
      );
    }
  }
}
