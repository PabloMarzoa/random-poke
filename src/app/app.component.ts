import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {finalize, forkJoin, Observable, take, tap} from "rxjs";
import {PokemonRestService} from "./services/pokemon-rest.service";
import {Pokemon} from "./models/pokemon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, NgIf, NgOptimizedImage, NgClass, NgStyle],
  providers: [PokemonRestService, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  private pokemonRestSrv = inject(PokemonRestService);
  private maxPokemon = 4;
  private maxPokemonId = 248;
  public loading = false;
  public loadedPokemon: Pokemon[] =[];

  getNewPokemon() {
    this.loadedPokemon = [];
    this.loading = true;

    // Calcula un valor aleatorio entre 1 y el maxPokemonId, registra un observable de llamada a ese id y lo añade a un array de longitud 4
    const pokeCallsById: Observable<Pokemon>[] = Array.from({length: this.maxPokemon}, () => this.pokemonRestSrv.getPokemon(Math.floor(Math.random() * this.maxPokemonId)));

    // forkJoin hace un return de un array con las respuestas de observables, en este caso los del array anterior
    forkJoin(pokeCallsById).pipe(take(1), finalize(() => this.loading = false)).subscribe(pokeArray => this.loadedPokemon = pokeArray);
  }
}
