import { createEffect, createEvent, createStore } from "effector";
import { User } from "../../domain/user";
import { Credential } from "./types";

export const $currentUser = createStore<User | null>(null);
export const $currentUserError = createStore<Error | null>(null);

export const logout = createEvent();

export const loginFx = createEffect<Credential, User>();
