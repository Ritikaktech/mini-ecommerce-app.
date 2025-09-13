import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../services/product-service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Product[], searchText: string): Product[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter((item) => item.name.toLowerCase().includes(searchText));
  }
}
