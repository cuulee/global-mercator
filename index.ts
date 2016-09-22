import * as Debug from 'debug'
import { range, isUndefined, keys } from 'lodash'

export const debug = {
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
 * Converts {@link LatLng} coordinates to {@link Meters} coordinates.
 *
 * @name latLngToMeters
 * @param {number} lat
 * @param {number} lng
 * @param {number} [zoom]
 * @returns {Object} Meters coordinates
 * @example
 * latLngToMeters({lat: 37, lng: 126})
 * //= Meters { mx: 14026255.83995247, my: 4439106.787250587 }
 */
export function latLngToMeters(init: InterfaceLatLng) {
  return mercator.latLngToMeters(init)
}

/**
 * Converts {@link Meters} coordinates to {@link LatLng} coordinates.
 * 
 * @name metersToLatLng
 * @param {number} mx
 * @param {number} my
 * @param {number} [zoom]
 * @returns {Object} LatLng coordinates
 * @example
 * metersToLatLng({ mx: 14026255, my: 4439106 })
 * //= LatLng { lat: 36.99999435205559, lng: 125.99999245457859 }
 */
export function metersToLatLng(init: InterfaceMeters) {
  return mercator.metersToLatLng(init)
}

/**
 * Converts {@link Meters} coordinates to {@link Pixels} coordinates.
 * 
 * @name metersToPixels
 * @param {number} mx
 * @param {number} my
 * @param {number} zoom
 * @returns {Object} Pixels coordinates
 * @example
 * metersToPixels({ mx: 14026255, my: 4439106, zoom: 13 })
 * //= Pixels { px: 1782579.1560447346, py: 1280877.3387406059, zoom: 13 }
 */
export function metersToPixels(init: InterfaceMeters) {
  return mercator.metersToPixels(init)
}

/**
 * Converts {@link LatLng} coordinates to TMS {@link Tile}.
 * 
 * @name latLngToTile
 * @param {number} lat
 * @param {number} lng
 * @param {number} zoom
 * @returns {Object} TMS Tile
 * @example
 * latLngToTile({lat: 37, lng: 126, zoom: 13 })
 * //= Tile { tx: 6963, ty: 5003, zoom: 13 }
 */
export function latLngToTile(init: InterfaceLatLng) {
  return mercator.latLngToTile(init)
}

/**
 * Converts {@link LatLng} coordinates to {@link Google} (XYZ) Tile.
 * 
 * @name latLngToGoogle
 * @param {number} lat
 * @param {number} lng
 * @returns {Object} Google (XYZ) Tile
 * @example
 * latLngToGoogle({lat: 37, lng: 126, zoom: 13 })
 * //= Google { x: 6963, y: 3188, zoom: 13 }
 */
export function latLngToGoogle(init: InterfaceLatLng) {
  return mercator.latLngToGoogle(init)
}

/**
 * Converts {@link Meters} coordinates to TMS {@link Tile}.
 * 
 * @name metersToTile
 * @param {number} mx
 * @param {number} my
 * @returns {Object} TMS Tile
 * @example
 * metersToTile({ mx: 14026255, my: 4439106, zoom: 13 })
 * //= Tile { tx: 6963, ty: 5003, zoom: 13 }
 */
export function metersToTile(init: Meters) {
  return mercator.metersToTile(init)
}

/**
 * Converts {@link Pixels} coordinates to {@link Meters} coordinates.
 * 
 * @name pixelsToMeters
 * @param {number} px
 * @param {number} py
 * @param {number} zoom
 * @returns {Object} Meters coordinates
 * @example
 * pixelsToMeters({ px: 1782579, py: 1280877, zoom: 13 })
 * //= Meters { mx: 14026252.018101055, my: 4439099.526918683, zoom: 13 }
 */
export function pixelsToMeters(init: Pixels) {
  return mercator.pixelsToMeters(init)
}

/**
 * Converts {@link Pixels} coordinates to TMS {@link Tile}.
 * 
 * @name pixelsToTile
 * @param {number} px
 * @param {number} py
 * @param {number} zoom
 * @returns {Object} TMS Tile
 * @example
 * pixelsToTile({ px: 1782579, py: 1280877, zoom: 13 })
 * //= Tile { tx: 6963, ty: 5003, zoom: 13 }
 */
export function pixelsToTile(init: Pixels) {
  return mercator.pixelsToTile(init)
}

/**
 * Converts TMS {@link Tile} to {@link bbox} in {@link Meters} coordinates.
 * 
 * @name tileBbox
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * tileBbox({ tx: 6963, ty: 5003, zoom: 13 })
 * //= [ 14025277.445990417, 4437016.617897913, 14030169.415800672, 4441908.587708164 ]
 */
export function tileBbox(init: Tile) {
  return mercator.tileBbox(init)
}

/**
 * Converts TMS {@link Tile} to {@link bbox} in {@link LatLng} coordinates.
 * 
 * @name tileLatLngBbox
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * tileLatLngBbox({ tx: 6963, ty: 5003, zoom: 13 })
 * //= [ 125.99121093749999, 36.98500309285596, 126.03515625, 37.020098201368135 ]
 */
export function tileLatLngBbox(init: Tile) {
  return mercator.tileLatLngBbox(init)
}

/**
 * Converts {@link Google} (XYZ) Tile to {@link bbox} in {@link Meters} coordinates.
 * 
 * @name googleBbox
 * @param {number} x
 * @param {number} y
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * googleBbox({ x: 6963, y: 3188, zoom: 13 })
 * //= [ 14025277.445990417, 4437016.617897913, 14030169.415800672, 4441908.587708164 ]
 */
export function googleBbox(init: Google) {
  return mercator.googleBbox(init)
}

/**
 * Converts {@link Google} (XYZ) Tile to {@link bbox} in {@link LatLng} coordinates.
 * 
 * @name googleLatLngBbox
 * @param {number} x
 * @param {number} y
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * googleLatLngBbox({ x: 6963, y: 3188, zoom: 13 })
 * //= [ 125.99121093749999, 36.98500309285596, 126.03515625, 37.020098201368135 ]
 */
export function googleLatLngBbox(init: Google) {
  return mercator.googleLatLngBbox(init)
}

/**
 * Converts TMS {@link Tile} to {@link Google} (XYZ) Tile.
 * 
 * @name tileGoogle
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * tileGoogle({ tx: 6963, ty: 5003, zoom: 13 })
 * //= Google { x: 6963, y: 3188, zoom: 13 }
 */
export function tileGoogle(init: Tile) {
  return mercator.tileGoogle(init)
}

/**
 * Converts {@link Google} (XYZ) Tile to TMS {@link Tile}.
 * 
 * @name googleTile
 * @param {number} x
 * @param {number} y
 * @param {number} zoom
 * @returns {Object} TMS Tile
 * @example
 * googleTile({ x: 6963, y: 3188, zoom: 13 })
 * //= Tile { tx: 6963, ty: 5003, zoom: 13 }
 */
export function googleTile(init: Google) {
  return mercator.googleTile(init)
}

/**
 * Converts {@link Google} (XYZ) Tile to {@link Quadkey}.
 * 
 * @name googleQuadkey
 * @param {number} x
 * @param {number} y
 * @param {number} zoom
 * @returns {string} Quadkey
 * @example
 * googleQuadkey({ x: 6963, y: 3188, zoom: 13 })
 * //= '1321102330211'
 */
export function googleQuadkey(init: Google) {
  return mercator.googleQuadkey(init)
}

/**
 * Converts TMS {@link Tile} to {@link QuadKey}.
 * 
 * @name tileQuadkey
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @returns {string} Quadkey
 * @example
 * tileQuadkey({ tx: 6963, ty: 5003, zoom: 13 })
 * //= '1321102330211'
 */
export function tileQuadkey(init: Tile) {
  return mercator.tileQuadkey(init)
}

/**
 * Converts {@link Quadkey} to TMS {@link Tile}.
 * 
 * @name quadkeyTile
 * @param {string} quadkey
 * @returns {Object} TMS Tile
 * @example
 * quadkeyTile('1321102330211')
 * //= Tile { tx: 6963, ty: 5003, zoom: 13 }
 */
export function quadkeyTile(quadkey: string) {
  return mercator.quadkeyTile(quadkey)
}

/**
 * Converts {@link Quadkey} to {@link Google} (XYZ) Tile.
 * 
 * @name quadkeyGoogle
 * @param {string} quadkey
 * @returns {Object} Google (XYZ) Tile
 * @example
 * quadkeyGoogle('1321102330211')
 * //= Google { x: 6963, y: 3188, zoom: 13 }
 */
export function quadkeyGoogle(quadkey: string) {
  return mercator.quadkeyGoogle(quadkey)
}

/**
 * Converts {@link bbox} from {@link LatLng} coordinates to {@link Meters} coordinates
 * 
 * @name bboxLatLngToMeters
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @returns {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * bboxLatLngToMeters([ 125, 35, 127, 37 ])
 * //= [ 13914936.349159198, 4163881.1440642904, 14137575.330745745, 4439106.787250587 ]
 */
export function bboxLatLngToMeters(bbox: number[]): number[] {
  return mercator.bboxLatLngToMeters(bbox)
}

/**
 * Validates TMS {@link Tile}.
 * 
 * @name validateTile
 * @param {number} tx
 * @param {number} ty
 * @param {number} zoom
 * @param {string} [name=Tile] - name used for debugging message
 * @throw Will throw an error if TMS Tile is not valid.
 * @returns {Object} TMS Tile
 * @example
 * validateTile({tx: 60, ty: 80, zoom: 5})
 * //= {tx: 60, ty: 80, zoom: 5}
 * validateTile({tx: 60, ty: -43, zoom: 5})
 * //= Error: Tile <ty> must not be less than 0
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
 * Validates {@link Zoom} level.
 * 
 * @name validateZoom
 * @param {number} Zoom level
 * @throw Will throw an error if zoom is not valid.
 * @returns {number} Zoom level
 * @example
 * validateZoom(12)
 * //= 12
 * validateZoom(-4)
 * //= Error: <zoom> cannot be less than 1
 * validateZoom(30)
 * //= Error: <zoom> cannot be greater than 23
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
 * Validates {@link Pixels} coordinates.
 * 
 * @name validatePixels
 * @param {Array<number>} Pixels coordinates
 * @throw Will throw an error if Pixels is not valid.
 * @returns {Array<number>} Pixels coordinates
 * @example
 * validatePixels([-115, 44])
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
 * Validates {@link Meters} coordinates.
 * 
 * @name validateMeters
 * @param {Array<number>} Meters coordinates
 * @throw Will throw an error if Meters is not valid.
 * @returns {Array<number>} Meters coordinates
 * @example
 * validateMeters([-115, 44])
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
 * Validates {@link LatLng} coordinates.
 * 
 * @name validateLatLng
 * @param {Array<number>} LatLng coordinates
 * @throw Will throw an error if LatLng is not valid.
 * @returns {Array<number>} LatLng coordinates
 * @example
 * validateLatLng([-115, 44])
 * //= [-115, 44]
 */
export function validateLatLng(init: number[]) {
  const [lng, lat] = validateLngLat([init[1], init[0]])
  return [lat, lng]
}

/**
 * Validates {@link LngLat} coordinates.
 * 
 * @name validateLngLat
 * @param {Array<number>} LngLat coordinates
 * @throw Will throw an error if LngLat is not valid.
 * @returns {Array<number>} LngLat coordinates
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
 * Validates {@link bbox}.
 * 
 * @name validateBbox
 * @param {Array<number>} bbox extent in [minX, minY, maxX, maxY] order
 * @throw Will throw an error if bbox is not valid.
 * @returns {Array<number} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * validateBbox([ -75, 44, -74, 45 ])
 * //= [ -75, 44, -74, 45 ]
 * validateBbox([ -75, 44, -74 ])
 * //= Error: [bbox] must be an Array of 4 numbers
 */
export function validateBbox(init: number[]) {
  if (init.length !== 4) {
    const message = '[bbox] must be an Array of 4 numbers'
    debug.error(message)
    throw new Error(message)
  }
  return [...init]
}

/**
 * Assert undefined items within object.
 * 
 * @name assertUndefined
 * @param {Object} items
 * @param {string} [name] - name used for debugging message
 * @throw Will throw an error if any item in Object is undefined.
 * @returns {Object} items
 * @example
 * assertUndefined({foo: 'bar'})
 * //= {foo: 'bar'}
 * assertUndefined({foo: undefined})
 * //= Error: <foo> is required
 */
export function assertUndefined(items: any, name?: string) {
  for (let key of keys(items)) {
    if (isUndefined(items[key])) {
      const message = (name) ? `${ name } <${ key }> is required` : `<${ key }> is required`
      debug.error(message)
      throw new Error(message)
    }
  }
  return items
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
    assertUndefined(this, 'Google')
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
    assertUndefined(this, 'Tile')
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
    if (!isUndefined(zoom)) { this.zoom = zoom }
    assertUndefined(this, 'Pixels')
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
    assertUndefined(this, 'Meters')
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
    assertUndefined(this, 'LatLng')
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
    if (isUndefined(zoom)) {
      const message = '<zoom> is required'
      debug.error(message)
      throw new Error(message)
    }
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

  public tileBbox(init: Tile) {
    const {tx, ty, zoom} = new Tile(init)
    let min = this.pixelsToMeters({ px: tx * this.TileSize, py: ty * this.TileSize, zoom })
    let max = this.pixelsToMeters({ px: (tx + 1) * this.TileSize, py: (ty + 1) * this.TileSize, zoom })

    return validateBbox([ min.mx, min.my, max.mx, max.my ])
  }

  public tileLatLngBbox(init: Tile) {
    if (init.zoom === 0) { return [ -180, -85.05112877980659, 180, 85.05112877980659 ] }

    const {tx, ty, zoom} = new Tile(init)
    const [mx1, my1, mx2, my2] = this.tileBbox({ tx, ty, zoom })
    const min = this.metersToLatLng({ mx: mx1, my: my1, zoom })
    const max = this.metersToLatLng({ mx: mx2, my: my2, zoom })

    return validateBbox([ min.lng, min.lat, max.lng, max.lat ])
  }

  public googleBbox(init: Google) {
    const Tile = this.googleTile(init)
    return this.tileBbox(Tile)
  }

  public googleLatLngBbox(init: Google) {
    const Tile = this.googleTile(init)
    return this.tileLatLngBbox(Tile)
  }

  public bboxLatLngToMeters = (bbox: number[]): number[] => {
    const min = this.latLngToMeters({lat: bbox[1], lng: bbox[0]})
    const max = this.latLngToMeters({lat: bbox[3], lng: bbox[2]})
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

  public googleQuadkey(init: Google) {
    const Tile = this.googleTile(init)
    return this.tileQuadkey(Tile)
  }

  public tileQuadkey(init: Tile) {
    // Zoom 0 does not exist for Quadkey
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

  public quadkeyTile(quadkey: string) {
    const Google = this.quadkeyGoogle(quadkey)
    return this.googleTile(Google)
  }

  public quadkeyGoogle(quadkey: string) {
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
        throw new Error('Invalid Quadkey digit sequence')
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
  tileBbox,
  tileLatLngBbox,
  tileGoogle,
  tileQuadkey,
  quadkeyGoogle,
  quadkeyTile,
  googleBbox,
  googleLatLngBbox,
  googleQuadkey,
}

/* istanbul ignore next */
if (require.main === module) {
  // const bbox = bboxLatLngToMeters([ -75.01464843750001, 44.99588261816546, -74.97070312499999, 45.02695045318546 ])
  // console.log(bbox)
  // const meters = pixelsToMeters({ px: 611669, py: 1342753, zoom: 13 })
  // console.log(meters)
  // console.log(metersToPixels(meters))
  // console.log(metersToLatLng(meters))
  // gdalwarp -of GTiff -te -8581121.501851652 -1353354.7654779512 -8575634.45283096 -1349909.177990999 lima_imagery.mbtiles lima_imagery.tif
  // console.log(validateLatLng([-120, 45, 1]))
  // validateMeters([200000, 999150000])
  // validateMeters([200000, 150000, 1])
  // validatePixels([200000, 150000, 1])
  // assertUndefined({x: null})
  // console.log(metersToLatLng({mx: 10018754.171394622, my: 5621521.486192067}))
  // console.log(metersToPixels({mx: 10000000, my: 5500000, zoom: 13}))
  // console.log(metersToPixels({mx: 3000, my: 4000}))
  console.log(latLngToMeters({lat: 23, lng: 23}))
  console.log(validateBbox([ -75, 44, -74 ]))
}
