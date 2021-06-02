import { Args, ObjectType, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "./user.type";

@Resolver(() => User)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @Query(() => User)
    findUser(@Args('userName') userName: string, @Args('password') password: string) {
        return this.authService.signIn(userName, password);
    }
}