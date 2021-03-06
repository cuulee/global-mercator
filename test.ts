import test from 'ava'
import { pick } from 'lodash'
import * as mercator from './index'

const TILE = { tx: 2389, ty: 5245, zoom: 13 }
const GOOGLE = { x: 2389, y: 2946, zoom: 13 }
const QUADKEY = '0302321010121'
const QUADKEY_BAD = '030486861'
const LATLNG = { lat: 44.99988840247, lng: -75.00005722045897, zoom: 13 }
const METERS = { mx: -8348968.179247875, my: 5621503.917462073, zoom: 13 }
const PIXELS = { px: 611669, py: 1342753, zoom: 13 }
const BBOX = [ -8350592.466098936, 5620873.311978721, -8345700.496288682, 5625765.281788976 ]
const BBOX_LATLNG = [ -75.01464843750001, 44.99588261816546, -74.97070312499999, 45.02695045318546 ]

test('latLngToMeters', t => {
  const meters = mercator.latLngToMeters(LATLNG)
  t.deepEqual(meters.mx.toFixed(2), METERS.mx.toFixed(2))
  t.deepEqual(meters.my.toFixed(2), METERS.my.toFixed(2))
})

test('metersToLatLng', t => {
  const latlng = mercator.metersToLatLng(METERS)
  const { lat, lng, zoom } = latlng
  t.deepEqual({lat, lng, zoom}, LATLNG)
})

test('metersToPixels', t => {
  const pixels = mercator.metersToPixels(METERS)
  const { px, py, zoom } = pixels
  t.deepEqual(px, PIXELS.px)
  t.deepEqual(py, PIXELS.py)
  t.deepEqual(zoom, PIXELS.zoom)
})

test('pixelsToTile', t => {
  const tile = mercator.pixelsToTile(PIXELS)
  t.deepEqual(tile, pick(TILE, ['tx', 'ty', 'zoom']))
})

test('metersToTile', t => {
  const tile = mercator.metersToTile(METERS)
  t.deepEqual(tile, pick(TILE, ['tx', 'ty', 'zoom']))
})

test('pixelsToMeters', t => {
  const meters = mercator.pixelsToMeters(PIXELS)
  t.deepEqual(meters.mx.toFixed(2), METERS.mx.toFixed(2))
  t.deepEqual(meters.my.toFixed(2), METERS.my.toFixed(2))
})

test('tileBbox', t => {
  const bbox = mercator.tileBbox(TILE)
  t.deepEqual(bbox.map(i => i.toFixed(2)), BBOX.map(i => i.toFixed(2)))
})

test('tileLatLngBbox', t => {
  const bbox = mercator.tileLatLngBbox(TILE)
  t.deepEqual(bbox, BBOX_LATLNG)
})

test('tileGoogle', t => {
  const google = mercator.tileGoogle(TILE)
  t.deepEqual(google, pick(GOOGLE, ['x', 'y', 'zoom']))
})

test('tileQuadkey', t => {
  const quadkey = mercator.tileQuadkey(TILE)
  t.deepEqual(quadkey, QUADKEY)
})

test('quadKeyGoogle', t => {
  const google = mercator.quadkeyGoogle(QUADKEY)
  t.deepEqual(google, pick(GOOGLE, ['x', 'y', 'zoom']))
})

test('quadKeyTile', t => {
  const tile = mercator.quadkeyTile(QUADKEY)
  t.deepEqual(tile, pick(TILE, ['tx', 'ty', 'zoom']))
})

test('Throws Error quadkeyTile', t => {
  t.throws(() => mercator.quadkeyTile(QUADKEY_BAD), 'Invalid Quadkey digit sequence')
})

test('googleBbox', t => {
  const bbox = mercator.googleBbox(GOOGLE)
  t.deepEqual(bbox.map(i => i.toFixed(2)), BBOX.map(i => i.toFixed(2)))
})

test('googleLatLonBbox', t => {
  const bbox = mercator.googleLatLngBbox(GOOGLE)
  t.deepEqual(bbox, BBOX_LATLNG)
})

test('latLngToGoogle', t => {
  const google = mercator.latLngToGoogle(LATLNG)
  t.deepEqual(google, pick(GOOGLE, ['x', 'y', 'zoom']))
})

test('googleQuadKey', t => {
  const quadkey = mercator.googleQuadkey(GOOGLE)
  t.deepEqual(quadkey, QUADKEY)
})

test('Throws Error Bad bbox', t => {
  t.throws(() => mercator.validateBbox([1]), '[bbox] must be an Array of 4 numbers')
  t.throws(() => mercator.validateBbox([1, 2]), '[bbox] must be an Array of 4 numbers')
  t.throws(() => mercator.validateBbox([1, 2, 3]), '[bbox] must be an Array of 4 numbers')
  t.throws(() => mercator.validateBbox([1, 2, 3, 4, 5]), '[bbox] must be an Array of 4 numbers')
})

test('Throws Error Bad LngLat', t => {
  t.throws(() => new mercator.LatLng({ lat: -220, lng: 120 }), 'LatLng [lat] must be within -90 to 90 degrees')
  t.throws(() => new mercator.LatLng({ lat: 220, lng: 120 }), 'LatLng [lat] must be within -90 to 90 degrees')
  t.throws(() => new mercator.LatLng({ lat: 45, lng: -220 }), 'LatLng [lng] must be within -180 to 180 degrees')
  t.throws(() => new mercator.LatLng({ lat: 45, lng: 220 }), 'LatLng [lng] must be within -180 to 180 degrees')
})

test('bboxLatLngToMeters', t => {
  const bbox = mercator.bboxLatLngToMeters(BBOX_LATLNG)
  t.deepEqual(bbox.map(i => i.toFixed(2)), BBOX.map(i => i.toFixed(2)))
})

test('googleTile', t => {
  const tile = mercator.googleTile(GOOGLE)
  t.deepEqual(tile, TILE)
})

test('latLngToTile', t => {
  const tile = mercator.latLngToTile(LATLNG)
  t.deepEqual(tile, TILE)
})

test('validateLatLng', t => {
  t.deepEqual(mercator.validateLatLng([85, -120]), [85, -120])
})

test('validateLngLat', t => {
  t.throws(() => mercator.validateLngLat([-120, 45, 1]), 'LatLng must be an Array of 2 numbers')
  t.throws(() => mercator.validateLngLat([-120, 190]), 'LatLng [lat] must be within -90 to 90 degrees')
  t.throws(() => mercator.validateLngLat([-220, 45]), 'LatLng [lng] must be within -180 to 180 degrees')
  t.deepEqual(mercator.validateLngLat([-120, 85.5]), [-120, 85])
  t.deepEqual(mercator.validateLngLat([-120, -85.5]), [-120, -85])
})

test('validateMeters', t => {
  t.throws(() => mercator.validateMeters([200000, 150000, 1]), 'Meters must be an Array of 2 numbers')
  t.throws(() => mercator.validateMeters([200000, 999150000]), 'Meters [my] cannot be greater than 20037508.342789244')
  t.throws(() => mercator.validateMeters([200000, -999150000]), 'Meters [my] cannot be less than -20037508.342789244')
  t.throws(() => mercator.validateMeters([999200000, 150000]), 'Meters [mx] cannot be greater than 20037508.342789244')
  t.throws(() => mercator.validateMeters([-999200000, -150000]), 'Meters [mx] cannot be less than -20037508.342789244')
})

test('validatePixels', t => {
  t.throws(() => mercator.validatePixels([200000, 150000, 1]), 'Pixels must be an Array of 2 numbers')
})

test('validateZoom', t => {
  t.throws(() => mercator.validateZoom(-2), '<zoom> cannot be less than 1')
  t.throws(() => mercator.validateZoom(25), '<zoom> cannot be greater than 23')
})

test('validateTile', t => {
  t.throws(() => mercator.validateTile({tx: -10, ty: 30, zoom: 5}), 'Tile <tx> must not be less than 0')
  t.throws(() => mercator.validateTile({tx: 30, ty: -10, zoom: 5}), 'Tile <ty> must not be less than 0')
})

test('validateUndefined', t => {
  t.throws(() => mercator.assertUndefined({x: undefined}), '<x> is required')
})

test('metersToPixels missing zoom', t => {
  t.throws(() => mercator.metersToPixels({ mx: -8348968.179247875, my: 5621503.917462073}), '<zoom> is required')
})
