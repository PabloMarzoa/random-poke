import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pokemon} from "../models/pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokemonRestService {
  private httpService = inject(HttpClient);

  getPokemon(id: number): Observable<Pokemon> {
    return this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${id}`) as Observable<Pokemon>;
  }
}
