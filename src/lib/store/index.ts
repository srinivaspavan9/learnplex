import { devtools } from 'zustand/middleware'
import create, { PartialState, State } from 'zustand'

import { User } from '../../graphql/types'

type NamedSetState<T extends State> = (
  partial: PartialState<T>,
  name?: any
) => void

interface UserStateProps {
  user: Partial<User> | null | undefined
  setUser: (user: Partial<User> | null | undefined) => void
  reset: () => void
}

const fn = (set: NamedSetState<UserStateProps>) => ({
  user: null,
  setUser: (user: Partial<User> | undefined | null) =>
    set((state) => ({ user: { ...(state.user || {}), ...user } }), 'SET_USER'),
  reset: () => set({ user: null }, 'RESET_USER'),
})

const isProduction = process.env.NODE_ENV === 'production'

const [useAuthUser, authUserState] = create(
  isProduction ? fn : devtools(fn, 'USER')
)

export { useAuthUser, authUserState }
