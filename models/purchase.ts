import { User } from '~/models'

export interface Purchase {
  id: string
  title: string
  cost: number | null
  users: User[]
}