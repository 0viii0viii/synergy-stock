/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const WatchlistLazyImport = createFileRoute('/watchlist')()
const IndexLazyImport = createFileRoute('/')()
const ItemStockCodeLazyImport = createFileRoute('/item/$stockCode')()

// Create/Update Routes

const WatchlistLazyRoute = WatchlistLazyImport.update({
  path: '/watchlist',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/watchlist.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ItemStockCodeLazyRoute = ItemStockCodeLazyImport.update({
  path: '/item/$stockCode',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/item/$stockCode.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/watchlist': {
      id: '/watchlist'
      path: '/watchlist'
      fullPath: '/watchlist'
      preLoaderRoute: typeof WatchlistLazyImport
      parentRoute: typeof rootRoute
    }
    '/item/$stockCode': {
      id: '/item/$stockCode'
      path: '/item/$stockCode'
      fullPath: '/item/$stockCode'
      preLoaderRoute: typeof ItemStockCodeLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  WatchlistLazyRoute,
  ItemStockCodeLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/watchlist",
        "/item/$stockCode"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/watchlist": {
      "filePath": "watchlist.lazy.tsx"
    },
    "/item/$stockCode": {
      "filePath": "item/$stockCode.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
