import * as Debug from 'debug'
import { range, isUndefined, keys } from 'lodash'

const debug = {
  error: Debug('global-mercator:error'),
  log: Debug('global-mercator:log'),
  warning: Debug('global-mercator:warning'),
}

export interface InterfaceMeters {
  mx: number
  my: number
  zoom?: number
}

export interface InterfacePixels {
  px: number
  py: number
  zoom: number
}

export interface InterfaceLatLng {
  lat: number
  lng: number
  zoom?: number
  z?: number
}

export interface InterfaceGoogle {
  x: number
  y: number
  zoom: number
}

export interface InterfaceTile {
  tx: number
  ty: number
  zoom: number
}

/**
 * Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913
 *
 * @name latLngToMeters
 * @param {number} lat
 * @param {number} lng
 * @param {number} zoom (Optional)
 * @returns {Meters}
 * @example
 * latLngToMeters({lat: 45, lng: 90})
 * //=> Meters { mx: 10018754.171394622, my: 5621521.486192067 }
 */
export function latLngToMeters(init: InterfaceLatLng) {
  return mercator.latLngToMeters(init)
}

/**
 * Converts XY point from Spherical Mercator EPSG:900913 to lat/lng in WGS84 Datum 
 * 
 * @name metersToLatLng
 * @param {number} mx
 * @param {number} my
 * @param {number} zoom (Optional)
 * @returns {LatLng}
 * @example
 * metersToLatLng({mx: 10000000, my: 5500000})
 * //=> LatLng { lat: 44.2228902348575, lng: 89.83152841195214 }
 */
export function metersToLatLng(init: InterfaceMeters) {
  return mercator.metersToLatLng(init)
}

/**
 * Converts EPSG:900913 to pyramid pixel coordinates in given zoom level
 * 
 * @name metersToPixels
 * @param {number} mx
 * @param {number} my
 * @param {number} zoom
 * @returns {Pixels}
 * @example
 * metersToPixels({mx: 10000000, my: 5500000, zoom: 13})
 * //=> Pixels { px: 1571882.5818671728, py: 1336394.6200269451, zoom: 13 }
 */
export function metersToPixels(init: InterfaceMeters) {
  return mercator.metersToPixels(init)
}

/**
 * Returns Tile for given latlng coordinates
 * 
 * @name latLngToTile
 * @param {number} lat
 * @param {number} lng
 * @param {number} zoom
 * @returns {Tile}
 */
export function latLngToTile(init: InterfaceLatLng) {
  return mercator.latLngToTile(init)
}

/**
 * Returns Google Tile for given latlng coordinates
 * 
 * @name latLngToGoogle
 * @param {number} lat
 * @param {number} lng
 * @returns {Google} Google Tile
 */
export function latLngToGoogle(init: InterfaceLatLng) {
  return mercator.latLngToGoogle(init)
}

/**
 * Returns Tile for given mercator coordinates
 * 
 * @name metersToTile
 * @param {number} mx
 * @param {number} my
 * @returns {Tile}
 */
export function metersToTile(init: Meters) {
  return mercator.metersToTile(init)
}

/**
 * Converts pixel coordinates in given zoom level of pyramid to EPSG:900913
 * 
 * @name pixelsToMeters
 * @param {number} px
 * @param {number} py
 * @param {number} zoom
 * @returns {Meters}
 */
export function pixelsToMeters(init: Pixels) {
  return mercator.pixelsToMeters(init)
}

/**
 * Returns a Tile covering region in given pixel coordinates
 * 
 * @name pixelsToTile
 * @param {number} px
 * @param {number} py
 * @param {number} zoom
 * @returns {Tile}
 */
export function pixelsToTile(init: Pixels) {
  return mercator.pixelsToTile(init)
}

/**
 * Returns bounds of the given Tile in EPSG:900913 coordinates
 * 
 * @name tileBounds
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 */
export function tileBounds(init: Tile) {
  return mercator.tileBounds(init)
}

/**
 * Returns bounds of the given Tile in EPSG:900913 coordinates
 * 
 * @name tileLatLonBounds
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 */
export function tileLatLonBounds(init: Tile) {
  return mercator.tileLatLonBounds(init)
}

/**
 * Converts Google Tile system in Mercator bounds (Meters)
 * 
 * @name googleBounds
 * @param {number} x
 * @param {number} y
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 */
export function googleBounds(init: Google) {
  return mercator.googleBounds(init)
}

/**
 * Converts Google Tile system in LatLng bounds (degrees)
 * 
 * @name googleLatLonBounds
 * @param {number} x
 * @param {number} y
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 */
export function googleLatLonBounds(init: Google) {
  return mercator.googleLatLonBounds(init)
}

/**
 * Converts TMS Tile coordinates to Google Tile coordinates
 * 
 * @name tileGoogle
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 */
export function tileGoogle(init: Tile) {
  return mercator.tileGoogle(init)
}

/**
 * Converts Google Tile coordinates to TMS Tile coordinates
 * 
 * @name googleTile
 * @param {number} x
 * @param {number} y
 * @param {number} zoom
 * @returns {Tile}
 */
export function googleTile(init: Google) {
  return mercator.googleTile(init)
}

/**
 * Converts Google Tile coordinates to Microsoft QuadKey
 * 
 * @name googleQuadKey
 * @param {number} x
 * @param {number} y
 * @param {number} zoom
 * @returns {quadkey}
 */
export function googleQuadKey(init: Google) {
  return mercator.googleQuadKey(init)
}

/**
 * Converts TMS Tile coordinates to Microsoft QuadKey
 * 
 * @name tileQuadKey
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @returns {quadkey}
 */
export function tileQuadKey(init: Tile) {
  return mercator.tileQuadKey(init)
}

/**
 * Converts QuadKey to TMS Tile coordinates
 * 
 * @name quadKeyTile
 * @param {string} quadkey
 * @returns {Tile}
 */
export function quadKeyTile(quadkey: string) {
  return mercator.quadKeyTile(quadkey)
}

/**
 * Converts QuadKey to Google Tile
 * 
 * @name quadKeyGoogle
 * @param {string} quadkey
 * @returns {Google}
 */
export function quadKeyGoogle(quadkey: string) {
  return mercator.quadKeyGoogle(quadkey)
}

/**
 * Converts bounds from LatLng to Meters
 * 
 * @name boundsLatLngToMeters
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {Array<number>} bounds
 */
export function boundsLatLngToMeters(bounds: number[]): number[] {
  return mercator.boundsLatLngToMeters(bounds)
}

/**
 * Validate Undefined
 * @name validateUndefined
 * @param {string} name
 * @param {Object} items
 * @example
 * validateUndefined('Meters', Object)
 */
export function validateUndefined(items: any, name?: string) {
  for (let key of keys(items)) {
    if (isUndefined(items[key])) {
      const message = (name) ? `${ name } <${ key }> is required.` : `<${ key }> is required.`
      debug.error(message)
      throw new Error(message)
    }
  }
}

/**
 * Validates Tile
 * @name validateTile
 * @example
 * const tile = validateTile({tx: 60, ty: 80, zoom: 5})
 * //= {tx: 60, ty: 80, zoom: 5}
 */
export function validateTile(init: InterfaceTile, name = 'Tile') {
  const { tx, ty, zoom } = init
  validateZoom(zoom, 'Tile')
  if (tx < 0) {
    const message = `${ name } <tx> must not be less than 0`
    debug.error(message)
    throw new Error(message)
  } else if (ty < 0) {
    const message = `${ name } <ty> must not be less than 0`
    debug.error(message)
    throw new Error(message)
  }
  return init
}

/**
 * Validates Zoom
 * @name validateZoom
 * @example
 * const zoom = validateZoom(12)
 * //= 12
 */
export function validateZoom(zoom: number, name?: string) {
  if (zoom < 1) {
    const message = (name) ? `${ name } <zoom> cannot be less than 1` : '<zoom> cannot be less than 1'
    debug.error(message)
    throw new Error(message)
  } else if (zoom > 23) {
    const message = (name) ? `${ name } <zoom> cannot be greater than 23` : '<zoom> cannot be greater than 23'
    debug.error(message)
    throw new Error(message)
  }
  return zoom
}

/**
 * Validates Pixels
 * @name validatePixels
 * @example
 * const pixels = validatePixels([-115, 44])
 * //= [-115, 44]
 */
export function validatePixels(init: number[]) {
  if (init.length < 2 || init.length >= 3) {
    const message = 'Pixels must be an Array of 2 numbers'
    debug.error(message)
    throw new Error(message)
  }
  let [px, py] = init
  if (px % 1 !== 0) {
    px = px - px % 1
    const message = `Pixels [px] has been modified to ${ px }`
    debug.warning(message)
  }
  if (py % 1 !== 0) {
    py = py - py % 1
    const message = `Pixels [py] has been modified to ${ py }`
    debug.warning(message)
  }
  return [px, py]
}

/**
 * Validates Meters
 * @name validateMeters
 * @example
 * const meters = validateMeters([-115, 44])
 * //= [-115, 44]
 */
export function validateMeters(init: number[]) {
  if (init.length < 2 || init.length >= 3) {
    const message = 'Meters must be an Array of 2 numbers'
    debug.error(message)
    throw new Error(message)
  }
  const max = 20037508.342789244
  const min = -20037508.342789244
  let [mx, my] = init
  if (my > max) {
    const message = `Meters [my] cannot be greater than ${ max }`
    debug.error(message)
    throw new Error(message)
  }
  if (my < min) {
    const message = `Meters [my] cannot be less than ${ min }`
    debug.error(message)
    throw new Error(message)
  }
  if (mx > max) {
    const message = `Meters [mx] cannot be greater than ${ max }`
    debug.error(message)
    throw new Error(message)
  }
  if (mx < min) {
    const message = `Meters [mx] cannot be less than ${ min }`
    debug.error(message)
    throw new Error(message)
  }
  return [mx, my]
}

/**
 * Validates LatLng
 * @name validateLatLng
 * @example
 * validateLatLng([-115, 44])
 * //= [-115, 44]
 */
export function validateLatLng(init: number[]) {
  const [lng, lat] = validateLngLat([init[1], init[0]])
  return [lat, lng]
}

/**
 * Validates LngLat
 * @name validateLngLat
 * @example
 * validateLngLat([-115, 44])
 * //= [-115, 44]
 */
export function validateLngLat(init: number[]) {
  if (init.length < 2 || init.length >= 3) {
    const message = 'LatLng must be an Array of 2 numbers'
    debug.error(message)
    throw new Error(message)
  }
  let [lng, lat] = init
  if (lat < -90 || lat > 90) {
    const message = 'LatLng [lat] must be within -90 to 90 degrees'
    debug.error(message)
    throw new Error(message)
  } else if (lng < -180 || lng > 180) {
    const message = 'LatLng [lng] must be within -180 to 180 degrees'
    debug.error(message)
    throw new Error(message)
  }
  if (lat > 85) {
    const message = 'LatLng [lat] has been modified to 85'
    debug.warning(message)
    lat = 85
  }
  if (lat < -85) {
    const message = 'LatLng [lat] has been modified to -85'
    debug.warning(message)
    lat = -85
  }
  return [lng, lat]
}

/**
 * Validates bounds
 * @name bounds
 * @example
 * const bounds = validateBounds([ -75, 44, -74, 45 ])
 * //= [ -75, 44, -74, 45 ]
 */
export function validateBounds(init: number[]) {
  if (init.length !== 4) {
    const message = '[bounds] must be an Array of 4 numbers'
    debug.error(message)
    throw new Error(message)
  }
  return [...init]
}

export class Google {
  public x: number
  public y: number
  public zoom: number

  constructor(init: InterfaceGoogle) {
    const {x, y, zoom} = init
    this.x = x
    this.y = y
    this.zoom = zoom
    validateUndefined(this, 'Google')
  }
}

export class Tile {
  public tx: number
  public ty: number
  public zoom: number

  constructor(init: InterfaceTile) {
    const {tx, ty, zoom} = init
    this.tx = tx
    this.ty = ty
    this.zoom = zoom
    validateUndefined(this, 'Tile')
    validateTile(this)
  }
}

export class Pixels {
  public px: number
  public py: number
  public zoom: number

  constructor(init: InterfacePixels) {
    const {px, py, zoom} = init
    this.px = px
    this.py = py
    this.zoom = zoom
    validateUndefined(this, 'Pixels')
    validatePixels([px, py])
  }
}

export class Meters {
  public mx: number
  public my: number
  public zoom: number

  constructor(init: InterfaceMeters) {
    const {mx, my, zoom} = init
    this.mx = mx
    this.my = my
    if (!isUndefined(zoom)) { this.zoom = zoom }
    validateUndefined(this, 'Meters')
    validateMeters([mx, my])
  }
}

export class LatLng {
  public lat: number
  public lng: number
  public zoom: number

  constructor(init: InterfaceLatLng) {
    const {lng, lat} = init
    this.lat = lat
    this.lng = lng
    if (!isUndefined(init.zoom)) { this.zoom = init.zoom }
    validateUndefined(this, 'LatLng')
    validateLatLng([lat, lng])
  }
}

class GlobalMercator {
  public name: string = 'GlobalMercator'
  private TileSize: number
  private initialResolution: number
  private originShift: number

  constructor(TileSize: number = 256) {
    this.TileSize = TileSize
    this.initialResolution = 2 * Math.PI * 6378137 / this.TileSize
    this.originShift = 2 * Math.PI * 6378137 / 2.0
  }

  public Resolution(zoom: number) {
    return this.initialResolution / Math.pow(2, zoom)
  }

  public latLngToMeters(init: InterfaceLatLng) {
    const { lat, lng, zoom } = new LatLng(init)
    let mx: number = lng * this.originShift / 180.0
    let my: number = Math.log(Math.tan((90 + lat) * Math.PI / 360.0 )) / (Math.PI / 180.0)
    my = my * this.originShift / 180.0
    return new Meters({ mx, my, zoom })
  }

  public metersToLatLng(init: InterfaceMeters) {
    const { mx, my, zoom } = new Meters(init)
    let lng = (mx / this.originShift) * 180.0
    let lat = (my / this.originShift) * 180.0
    lat = 180 / Math.PI * (2 * Math.atan( Math.exp( lat * Math.PI / 180.0)) - Math.PI / 2.0)

    return new LatLng({ lat, lng, zoom })
  }

  public metersToPixels(init: InterfaceMeters) {
    const { mx, my, zoom } = new Meters(init)
    const res = this.Resolution(zoom)
    const px = (mx + this.originShift) / res
    const py = (my + this.originShift) / res

    return new Pixels({ px, py, zoom })
  }

  public latLngToTile(init: InterfaceLatLng) {
    const meters = this.latLngToMeters(init)
    const pixels = this.metersToPixels(meters)
    return this.pixelsToTile(pixels)
  }

  public latLngToGoogle(init: InterfaceLatLng) {
    if (init.zoom === 0) { return new Google({ x: 0, y: 0, zoom: 0 })}
    const tile = this.latLngToTile(init)
    return this.tileGoogle(tile)
  }

  public metersToTile(init: Meters) {
    if (init.zoom === 0) { return new Tile({ tx: 0, ty: 0, zoom: 0 })}
    const Pixels = this.metersToPixels(new Meters(init))
    return this.pixelsToTile(Pixels)
  }

  public pixelsToMeters(init: Pixels) {
    const {px, py, zoom} = new Pixels(init)
    const res = this.Resolution(zoom)
    const mx = px * res - this.originShift
    const my = py * res - this.originShift

    return new Meters({ mx, my, zoom })
  }

  public pixelsToTile(init: Pixels) {
    if (init.zoom === 0) { return new Tile({ tx: 0, ty: 0, zoom: 0 })}
    const {px, py, zoom} = new Pixels(init)
    let tx = Math.ceil(px / this.TileSize) - 1
    let ty = Math.ceil(py / this.TileSize) - 1
    if (tx < 0) { tx = 0 }
    if (ty < 0) { ty = 0 }
    return new Tile({ tx, ty, zoom })
  }

  public tileBounds(init: Tile) {
    const {tx, ty, zoom} = new Tile(init)
    let min = this.pixelsToMeters({ px: tx * this.TileSize, py: ty * this.TileSize, zoom })
    let max = this.pixelsToMeters({ px: (tx + 1) * this.TileSize, py: (ty + 1) * this.TileSize, zoom })

    return validateBounds([ min.mx, min.my, max.mx, max.my ])
  }

  public tileLatLonBounds(init: Tile) {
    if (init.zoom === 0) { return [ -180, -85.05112877980659, 180, 85.05112877980659 ] }

    const {tx, ty, zoom} = new Tile(init)
    const [mx1, my1, mx2, my2] = this.tileBounds({ tx, ty, zoom })
    const min = this.metersToLatLng({ mx: mx1, my: my1, zoom })
    const max = this.metersToLatLng({ mx: mx2, my: my2, zoom })

    return validateBounds([ min.lng, min.lat, max.lng, max.lat ])
  }

  public googleBounds(init: Google) {
    const Tile = this.googleTile(init)
    return this.tileBounds(Tile)
  }

  public googleLatLonBounds(init: Google) {
    const Tile = this.googleTile(init)
    return this.tileLatLonBounds(Tile)
  }

  public boundsLatLngToMeters = (bounds: number[]): number[] => {
    const min = this.latLngToMeters({lat: bounds[1], lng: bounds[0]})
    const max = this.latLngToMeters({lat: bounds[3], lng: bounds[2]})
    return [min.mx, min.my, max.mx, max.my]
  }

  public tileGoogle(init: Tile) {
    if (init.zoom === 0) { return new Google({ x: 0, y: 0, zoom: 0 })}

    const { tx, ty, zoom } = new Tile(init)
    const x = tx
    const y = (Math.pow(2, zoom) - 1) - ty

    return new Google({ x, y, zoom })
  }

  public googleTile(init: Google) {
    const { x, y, zoom } = new Google(init)
    const tx = x
    const ty = Math.pow(2, zoom) - y - 1

    return new Tile({ tx, ty, zoom })
  }

  public googleQuadKey(init: Google) {
    const Tile = this.googleTile(init)
    return this.tileQuadKey(Tile)
  }

  public tileQuadKey(init: Tile) {
    // Zoom 0 does not exist for QuadKey
    if (init.zoom === 0) { return '' }

    let { tx, ty, zoom } = new Tile(init)
    let quadkey = ''

    ty = (Math.pow(2, zoom) - 1) - ty
    range(zoom, 0, -1).map(i => {
      let digit: any = 0
      let mask = 1 << (i - 1)
      if ((tx & mask) !== 0) { digit += 1 }
      if ((ty & mask) !== 0) { digit += 2 }
      quadkey = quadkey.concat(digit)
    })

    return quadkey
  }

  public quadKeyTile(quadkey: string) {
    const Google = this.quadKeyGoogle(quadkey)
    return this.googleTile(Google)
  }

  public quadKeyGoogle(quadkey: string) {
    let x: number = 0
    let y: number = 0
    const zoom = quadkey.length

    range(zoom, 0, -1).map(i => {
      let mask = 1 << (i - 1)

      switch (parseInt(quadkey[zoom - i], 0)) {
      case 0:
        break
      case 1:
        x += mask
        break
      case 2:
        y += mask
        break
      case 3:
        x += mask
        y += mask
        break
      default:
        throw new Error('Invalid QuadKey digit sequence')
      }
    })
    return new Google({ x, y, zoom })
  }
}
const mercator = new GlobalMercator()

export default {
  metersToPixels,
  metersToLatLng,
  metersToTile,
  pixelsToTile,
  pixelsToMeters,
  latLngToMeters,
  latLngToGoogle,
  tileBounds,
  tileLatLonBounds,
  tileGoogle,
  tileQuadKey,
  quadKeyGoogle,
  quadKeyTile,
  googleBounds,
  googleLatLonBounds,
  googleQuadKey,
}

/* istanbul ignore next */
if (require.main === module) {
  // const bounds = boundsLatLngToMeters([ -75.01464843750001, 44.99588261816546, -74.97070312499999, 45.02695045318546 ])
  // console.log(bounds)
  // const meters = pixelsToMeters({ px: 611669, py: 1342753, zoom: 13 })
  // console.log(meters)
  // console.log(metersToPixels(meters))
  // console.log(metersToLatLng(meters))
  // gdalwarp -of GTiff -te -8581121.501851652 -1353354.7654779512 -8575634.45283096 -1349909.177990999 lima_imagery.mbtiles lima_imagery.tif
  // console.log(validateLatLng([-120, 45, 1]))
  // validateMeters([200000, 999150000])
  // validateMeters([200000, 150000, 1])
  // validatePixels([200000, 150000, 1])
  // validateUndefined({x: null})
  // console.log(metersToLatLng({mx: 10018754.171394622, my: 5621521.486192067}))
  // console.log(metersToPixels({mx: 10000000, my: 5500000, zoom: 13}))
  console.log(validateLatLng([-85, -120]))
}
