import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { RestaurantGuard } from './restaurant.guard';

  describe('ProduitGuard', () => {
    let guard: RestaurantGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
function restaurantGuard(arg0: import("@angular/router").RouterStateSnapshot | import("@angular/router").ActivatedRouteSnapshot): any {
  throw new Error('Function not implemented.');
}

