import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { KeycloakService } from '../services/keycloak/keycloak.service';
import { inject } from '@angular/core';

export const httptokenInterceptor: HttpInterceptorFn = (req, next) => {
  const keycloakService = inject(KeycloakService)
  const token = keycloakService.keyCloak.token
  if (token) {
    const authReq = req.clone({
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    })
    return next(authReq)
  }
  return next(req);
};
