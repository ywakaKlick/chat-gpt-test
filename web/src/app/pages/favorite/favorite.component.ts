import { Component } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { Favorite } from 'src/app/model/favorite';
import { saveAs } from 'file-saver';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss', '../../styles/general.scss']
})

export class FavoriteComponent {
  favorites?: Favorite[];

  constructor(private favorite_service: FavoriteService, private snackbar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    await this.refresh_favorites();
  }

  async on_delete(id: number) {
    try {
      await this.favorite_service.delete_favorite(id);
      await this.refresh_favorites();
      this.snackbar.open('Successfully deleted!', undefined, { duration: 3000 })
    } catch (e) {
      console.log(e);
      this.snackbar.open('An error occurred deleting a favorite', undefined, { duration: 3000 })
    }
  }

  async refresh_favorites() {
    try {
      this.favorites = await this.favorite_service.get_favorites();
    } catch (e) {
      console.log(e);
    }
  }

  async on_export() {
    try {
      const data = await this.favorite_service.export_favorites();
      if (!data) return;

      saveAs(data, `favorites.json`);
      this.snackbar.open('Successfully exported!', undefined, { duration: 3000 })
    } catch (e) {
      console.log(e);
      this.snackbar.open('An error occurred while exporting', undefined, { duration: 3000 })
    }
  }
}
