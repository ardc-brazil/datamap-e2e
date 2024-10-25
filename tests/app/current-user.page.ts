import { Page } from "@playwright/test";

export interface GetUserByProviderResponse {
    id: string
    name: string
    email: string
    roles: string[]
    is_enabled: boolean
    created_at: string
    updated_at: string
    providers: GetUserByProviderProvidersResponse[]
    tenancies: string[]
}

export interface GetUserByProviderProvidersResponse {
    name: string
    reference: string
}

export class CurrentUserPage {
    readonly page: Page;
    user: GetUserByProviderResponse;

    constructor(page: Page) {
        this.page = page;
    }

    async getCurrentUser(): Promise<GetUserByProviderResponse> {
        if (!this.user) {
            const cookies = await this.page.context().cookies()
            const currentUserCookie = cookies.find(x => x.name == "current_user")
            this.user = JSON.parse(currentUserCookie.value) as GetUserByProviderResponse;
        }

        return this.user
    }
}