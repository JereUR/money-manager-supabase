import { dashboard, expenses, trend } from './Icons'

export const menuItems = [
  {
    id: 1,
    title: 'Panel de Control',
    icon: dashboard,
    link: '/panel-de-control'
  },
  {
    id: 2,
    title: 'Ingresos',
    icon: trend,
    link: '/ingresos'
  },
  {
    id: 3,
    title: 'Gastos',
    icon: expenses,
    link: '/gastos'
  }
]
