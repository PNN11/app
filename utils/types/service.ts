import { AuthService } from 'services/api/auth'

export class ApiService {
    protected authService: AuthService

    constructor(authService?: AuthService) {
        this.authService = authService
    }
}
