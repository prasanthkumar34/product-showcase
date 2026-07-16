import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const CATEGORIES = [
  'Electronics',
  'Home Appliances',
  'Fashion',
  'Sports & Fitness',
  'Books & Stationery',
  'Toys & Games',
]

/** @type {Record<string, Array<{name: string, short: string, long: string, specs: Record<string, string>, price: [number, number]}>>} */
const catalog = {
  Electronics: [
    {
      name: 'Aurora Wireless Earbuds',
      short: 'Compact true-wireless earbuds with a charging case that lasts through a workweek.',
      long: 'Aurora buds use a dual-mic setup that cuts wind noise on calls. The case tops up both sides three times before you need a wall outlet. Pairing is one-tap on most phones.',
      specs: { 'Battery Life': '8 hours', 'Driver Size': '10mm', Weight: '52g (with case)', Connectivity: 'Bluetooth 5.3', 'Water Resistance': 'IPX4' },
      price: [49, 89],
    },
    {
      name: 'Nimbus 14 Laptop',
      short: 'A 14-inch everyday laptop built for writing, browsing, and light creative work.',
      long: 'Nimbus 14 stays cool under video calls and spreadsheets. The keyboard has decent travel, and the trackpad is wide enough for gestures. Battery usually covers a full day of mixed use.',
      specs: { Display: '14-inch IPS', Storage: '512GB SSD', RAM: '16GB', Weight: '1.4kg', 'Battery Life': '11 hours' },
      price: [699, 999],
    },
    {
      name: 'PulseFit Smartwatch',
      short: 'A slim smartwatch that tracks workouts, sleep, and heart rate without looking bulky.',
      long: 'PulseFit syncs with your phone and nudges you when you have been sitting too long. Swim mode locks the screen so taps do not mess up your set. Watch faces are plain and readable outdoors.',
      specs: { Display: '1.4-inch AMOLED', 'Battery Life': '5 days', Sensors: 'HR, SpO2, GPS', 'Water Resistance': '5 ATM', Compatibility: 'iOS & Android' },
      price: [129, 199],
    },
    {
      name: 'ClearFrame 4K Monitor',
      short: '27-inch 4K monitor with USB-C that powers a laptop while carrying video.',
      long: 'ClearFrame is meant for desk setups where one cable is enough. Colors are accurate enough for photo edits, and the stand tilts and raises without tools. Speakers are fine for calls, not for music.',
      specs: { Resolution: '3840x2160', Size: '27-inch', 'Refresh Rate': '60Hz', Ports: 'HDMI, DP, USB-C', 'Panel Type': 'IPS' },
      price: [279, 399],
    },
    {
      name: 'Vault Portable SSD 1TB',
      short: 'Pocket-sized 1TB SSD with hardware encryption for travel backups.',
      long: 'Vault connects over USB-C and sustains speeds that make large video dumps tolerable. The metal shell shrugs off backpack abuse. A PIN app locks the drive if it goes missing.',
      specs: { Capacity: '1TB', Interface: 'USB 3.2 Gen 2', 'Read Speed': '1050 MB/s', Encryption: 'AES-256', Weight: '58g' },
      price: [89, 149],
    },
    {
      name: 'Orbit Bluetooth Speaker',
      short: 'Rugged Bluetooth speaker with a surprisingly wide stereo field for its size.',
      long: 'Orbit handles poolside playlists and kitchen counters without sounding tinny. Party mode links two speakers if you want more volume. The battery indicator is honest instead of optimistic.',
      specs: { 'Battery Life': '12 hours', 'Water Resistance': 'IP67', Connectivity: 'Bluetooth 5.2', Weight: '640g', Output: '20W' },
      price: [59, 99],
    },
    {
      name: 'Keyline Mechanical Keyboard',
      short: 'Hot-swappable mechanical keyboard with quiet switches for shared offices.',
      long: 'Keyline ships with tactile switches that stay quiet enough for open desks. The aluminum plate keeps the board from flexing. Mac and Windows layouts are both on the box.',
      specs: { Switches: 'Tactile silent', Layout: '75%', Connection: 'USB-C / Bluetooth', Keycaps: 'PBT doubleshot', Weight: '890g' },
      price: [99, 159],
    },
    {
      name: 'LensKit Webcam Pro',
      short: '1080p webcam with a privacy shutter and auto light correction.',
      long: 'LensKit locks focus on your face during calls instead of hunting the background. The mic is usable if you are alone in a quiet room. Mount clips to laptops and monitors without tools.',
      specs: { Resolution: '1080p 60fps', FOV: '78 degrees', Mic: 'Dual stereo', Mount: 'Monitor clip', Connection: 'USB-A' },
      price: [69, 119],
    },
    {
      name: 'ChargeHub GaN 65W',
      short: 'Three-port GaN charger that fills a laptop and phone from one brick.',
      long: 'ChargeHub stays cooler than older 65W bricks and fits in a jacket pocket. Ports share power intelligently when everything is plugged in. Cable not included, by design.',
      specs: { Output: '65W total', Ports: '2x USB-C, 1x USB-A', Tech: 'GaN', Input: '100-240V', Weight: '145g' },
      price: [39, 59],
    },
    {
      name: 'StreamCast Capture Card',
      short: 'USB capture card for bringing console and camera feeds into your PC.',
      long: 'StreamCast passes 1080p60 with low lag for gameplay overlays. Drivers install cleanly on Windows; Mac users get UVC out of the box. HDMI loop-out keeps your TV in the mix.',
      specs: { Input: 'HDMI', Output: 'USB 3.0', Resolution: '1080p60', 'Loop-out': 'Yes', Latency: '<60ms' },
      price: [79, 129],
    },
    {
      name: 'QuietFan Laptop Stand',
      short: 'Aluminum stand with a quiet fan that cools thin laptops during long sessions.',
      long: 'QuietFan lifts the screen to a better angle and pulls heat off the underside. The fan has two speeds and is barely audible on low. Rubber pads keep the laptop from sliding.',
      specs: { Material: 'Aluminum', 'Fan Noise': '22 dB (low)', Height: 'Adjustable 15-20cm', Compatibility: 'Up to 17-inch', Power: 'USB' },
      price: [35, 55],
    },
    {
      name: 'PixelBeam LED Desk Lamp',
      short: 'Dimmable desk lamp with a warm-to-cool dial for late editing sessions.',
      long: 'PixelBeam spreads light evenly across a keyboard without harsh hotspots. The arm holds position after you set it. USB-C power means one less proprietary brick.',
      specs: { Brightness: '800 lumens', 'Color Temp': '2700-6500K', Power: 'USB-C 12W', Arm: 'Gooseneck', CRI: '95+' },
      price: [45, 75],
    },
    {
      name: 'SyncPad Drawing Tablet',
      short: 'Medium drawing tablet with a battery-free pen and express keys.',
      long: 'SyncPad maps cleanly in major illustration apps and keeps pen lag low enough for sketching. The surface has a slight tooth so it does not feel like glass. Six shortcut keys sit on the left.',
      specs: { 'Active Area': '10 x 6 in', Pressure: '8192 levels', Connection: 'USB-C', Pen: 'Battery-free', Weight: '590g' },
      price: [89, 149],
    },
    {
      name: 'MeshNode Wi-Fi Extender',
      short: 'Compact mesh node that fills dead zones without another ugly router.',
      long: 'MeshNode joins your existing network and covers rooms that drop video calls. Setup walks through the phone app in a few minutes. Night light mode dims the LEDs.',
      specs: { Standard: 'Wi-Fi 6', Bands: 'Dual-band', Coverage: 'Up to 1500 sq ft', Ports: '1x Gigabit', Setup: 'App-guided' },
      price: [69, 109],
    },
    {
      name: 'ClipMic Lavalier Kit',
      short: 'Dual lavalier mic kit for interviews and phone video with a clean cable run.',
      long: 'ClipMic plugs into phones and cameras with the included adapters. Windscreens cut outdoor fluff on the audio. The case keeps both mics and clips from disappearing in a bag.',
      specs: { Channels: 'Dual mono', Connector: '3.5mm TRRS', Cable: '6m each', Includes: 'Adapters + case', Frequency: '50Hz-18kHz' },
      price: [29, 49],
    },
    {
      name: 'FrameLock Action Cam',
      short: 'Stabilized action camera for bike rides and weekend trips.',
      long: 'FrameLock shoots 4K with electronic stabilization that keeps trails watchable. Waterproof housing is rated for shallow dives. The app dumps clips over Wi-Fi without hunting for a card reader.',
      specs: { Video: '4K 30fps', Stabilization: 'EIS', Waterproof: '10m with case', Storage: 'microSD', Battery: '90 minutes' },
      price: [149, 229],
    },
    {
      name: 'DockPro USB-C Hub',
      short: 'Eight-in-one hub that turns one USB-C port into a full desk setup.',
      long: 'DockPro adds HDMI, Ethernet, card readers, and charge-through in one stick. It runs warmer under load, so leave it some air. Drivers are not required on recent systems.',
      specs: { Ports: '8', HDMI: '4K 60Hz', Ethernet: '1Gbps', 'Power Delivery': '100W passthrough', Card: 'SD/microSD' },
      price: [55, 89],
    },
  ],
  'Home Appliances': [
    {
      name: 'BrewPath Drip Coffee Maker',
      short: 'Programmable drip machine with a thermal carafe that keeps coffee hot without a burner.',
      long: 'BrewPath starts on a timer so a pot is ready when you are. The thermal carafe avoids that scorched taste from a hot plate. Filters are standard basket size.',
      specs: { Capacity: '10 cups', Carafe: 'Stainless thermal', Timer: '24-hour', Power: '900W', 'Keep Warm': 'Thermal (no plate)' },
      price: [79, 129],
    },
    {
      name: 'SpinWave Compact Washer',
      short: 'Apartment-friendly washer that handles small loads without a full laundry room.',
      long: 'SpinWave fits in closets and under counters where full machines will not. Cycles are short enough for gym clothes between washes. Noise stays reasonable for shared walls.',
      specs: { Capacity: '1.6 cu ft', Spin: '1200 RPM', Cycles: '8', Water: 'Cold/Hot inlet', Dimensions: '24x24x33 in' },
      price: [399, 549],
    },
    {
      name: 'AirClear Tower Purifier',
      short: 'Quiet tower purifier with a HEPA filter sized for bedrooms and offices.',
      long: 'AirClear drops dust and pet dander overnight without sounding like a jet. The filter light is based on hours used, not vibes. Night mode dims everything.',
      specs: { Coverage: '400 sq ft', Filter: 'True HEPA H13', Noise: '24-52 dB', CADR: '240', Power: '45W' },
      price: [149, 219],
    },
    {
      name: 'HeatNest Ceramic Heater',
      short: 'Oscillating ceramic heater with tip-over shutoff for small rooms.',
      long: 'HeatNest warms a home office faster than waiting for central heat. Two heat levels plus fan-only cover most winter days. The handle makes it easy to move between rooms.',
      specs: { Power: '1500W', Modes: '2 heat + fan', Safety: 'Tip-over + overheat', Coverage: '200 sq ft', Oscillation: '70 degrees' },
      price: [45, 75],
    },
    {
      name: 'SteamLift Garment Steamer',
      short: 'Handheld steamer that pulls wrinkles from shirts without a full ironing board.',
      long: 'SteamLift heats in under a minute and works on hanging clothes. The water tank is large enough for a few shirts before a refill. Auto shutoff kicks in if you leave it idle.',
      specs: { 'Heat-up': '40 seconds', Tank: '300ml', Cord: '8 ft', Power: '1500W', 'Auto Off': '8 minutes' },
      price: [35, 59],
    },
    {
      name: 'FrostBox Mini Fridge',
      short: 'Quiet mini fridge for dorms and offices with a small freezer shelf.',
      long: 'FrostBox keeps drinks cold without the compressor roar of older cubes. The freezer shelf is for ice packs, not grocery runs. Reversible door helps tight corners.',
      specs: { Capacity: '3.2 cu ft', Freezer: 'Chiller shelf', Noise: '38 dB', Energy: 'Energy Star', Door: 'Reversible' },
      price: [129, 189],
    },
    {
      name: 'BlendForge Personal Blender',
      short: 'Single-serve blender with travel cups that double as the blending jar.',
      long: 'BlendForge is built for protein shakes and smoothies, not crushing ice mountains. Cups seal for the commute. The base stores two cups without taking half the counter.',
      specs: { Power: '900W', Cups: '2x 20oz', Blades: 'Stainless 6-tip', Pulse: 'Yes', BPA: 'Free' },
      price: [49, 79],
    },
    {
      name: 'DryAir Dehumidifier 30pt',
      short: '30-pint dehumidifier for basements and humid bedrooms.',
      long: 'DryAir pulls moisture without needing constant babysitting. Continuous drain hose support means fewer bucket empties. Auto humidity hold keeps the room steady.',
      specs: { Capacity: '30 pints/day', Tank: '1 gallon', Drain: 'Hose compatible', Coverage: '1500 sq ft', 'Auto Defrost': 'Yes' },
      price: [179, 249],
    },
    {
      name: 'ToastSlot 4-Slice Toaster',
      short: 'Four-slot toaster with a bagel setting that browns one side harder.',
      long: 'ToastSlot handles family breakfasts without a second round. Crumb trays slide out from both ends. The shade dial is consistent batch to batch.',
      specs: { Slots: '4', Settings: 'Bagel + defrost', Power: '1600W', 'Shade Levels': '7', Exterior: 'Brushed steel' },
      price: [39, 69],
    },
    {
      name: 'VacTrail Cordless Stick',
      short: 'Lightweight stick vacuum with a removable battery for whole-home runs.',
      long: 'VacTrail swaps batteries so you can finish upstairs after the first pack dies. The motorized head handles hardwood and low carpet. Crevice tools clip on the wand.',
      specs: { Runtime: '40 min (eco)', Battery: 'Removable 25.2V', Weight: '2.7kg', Filtration: '5-stage', Bin: '0.6L' },
      price: [199, 299],
    },
    {
      name: 'KettlePure Electric Kettle',
      short: 'Gooseneck electric kettle with temperature presets for pour-over coffee.',
      long: 'KettlePure holds the temperature you set instead of boiling everything the same way. The gooseneck spout makes slow pours controllable. Keep-warm runs for about 30 minutes.',
      specs: { Capacity: '0.9L', Presets: '5 temperatures', Power: '1200W', Spout: 'Gooseneck', 'Keep Warm': '30 min' },
      price: [55, 89],
    },
    {
      name: 'OvenMate Counter Convection',
      short: 'Countertop convection oven that replaces a toaster oven for weeknight meals.',
      long: 'OvenMate circulates heat evenly enough for sheet-pan dinners. Presets cover toast, bake, and air-fry style crisping. Cleanup is one removable crumb tray.',
      specs: { Capacity: '25L', Modes: 'Bake, toast, air crisp', Temp: '150-450F', Power: '1800W', Interior: 'Nonstick' },
      price: [119, 179],
    },
    {
      name: 'HumidMist Ultrasonic Humidifier',
      short: 'Cool-mist humidifier with a top-fill tank that is easy to clean.',
      long: 'HumidMist softens dry winter air in bedrooms without white dust if you use distilled water. The dial is simple — no app required. Night light is optional and dim.',
      specs: { Tank: '4L', Runtime: '24 hours', Mist: 'Cool ultrasonic', Coverage: '400 sq ft', Fill: 'Top-fill' },
      price: [45, 69],
    },
    {
      name: 'DishQuick Countertop Washer',
      short: 'Compact countertop dishwasher for small kitchens without a built-in unit.',
      long: 'DishQuick connects to the faucet for fill and drain. A full load handles plates for two people. Cycles finish quietly enough to run overnight.',
      specs: { 'Place Settings': '2', Water: 'Faucet adapter', Cycles: '5', Delay: '1-24 hours', Dimensions: '17x17x18 in' },
      price: [249, 349],
    },
    {
      name: 'IronPress Steam Station',
      short: 'Steam station iron with a large water tank for stacks of laundry.',
      long: 'IronPress puts out continuous steam that softens thick cotton faster than a basic iron. The cork handle stays cooler during long sessions. Auto shutoff covers the forgetful moments.',
      specs: { 'Steam Output': '120 g/min', Tank: '1.5L', Soleplate: 'Ceramic', Power: '2200W', 'Auto Off': 'Yes' },
      price: [89, 139],
    },
    {
      name: 'FanSweep Pedestal Fan',
      short: 'Quiet pedestal fan with remote and a timer for evening cool-downs.',
      long: 'FanSweep moves air across a room without the rattle of cheap motors. Height adjusts for couches and beds. The remote docks magnetically on the pole.',
      specs: { Speeds: '3', Oscillation: '90 degrees', Timer: '1-8 hours', Height: '40-52 in', Remote: 'Yes' },
      price: [49, 79],
    },
    {
      name: 'RiceBowl Fuzzy Cooker',
      short: 'Fuzzy-logic rice cooker that handles white, brown, and porridge without babysitting.',
      long: 'RiceBowl adjusts cook time based on moisture instead of a single timer. The nonstick pot cleans with a soft sponge. Keep-warm does not dry the rice out for hours.',
      specs: { Capacity: '5.5 cups uncooked', Modes: 'White, brown, porridge', Pot: 'Nonstick', Power: '860W', Timer: '24-hour delay' },
      price: [69, 109],
    },
  ],
  Fashion: [
    {
      name: 'Northline Merino Crew',
      short: 'Fine-gauge merino crewneck that layers under jackets without bulk.',
      long: 'Northline regulates temperature better than cotton on travel days. The knit resists odor after a couple of wears. Fit is straight through the body with a clean crew collar.',
      specs: { Material: '100% merino', Weight: '180 gsm', Fit: 'Regular', Care: 'Machine wash cold', Origin: 'Portugal' },
      price: [68, 98],
    },
    {
      name: 'Harbor Canvas Tote',
      short: 'Structured canvas tote with a zip top and a padded laptop sleeve.',
      long: 'Harbor carries a 15-inch laptop and a day of errands without collapsing. The base holds shape when you set it down. Interior pocket keeps keys from sinking to the bottom.',
      specs: { Material: '12oz canvas', Laptop: '15-inch sleeve', Closure: 'Zip top', Dimensions: '16x13x5 in', Pockets: '3 interior' },
      price: [48, 78],
    },
    {
      name: 'RidgeWalk Chukka Boots',
      short: 'Leather chukkas with a grippy outsole for city sidewalks and light trails.',
      long: 'RidgeWalk breaks in over a week instead of fighting your feet for a month. The midsole cushions all-day wear. Leather ages with scuffs that look intentional.',
      specs: { Upper: 'Full-grain leather', Sole: 'Rubber lug', Lining: 'Leather', Sizes: '7-13 US', Construction: 'Cemented' },
      price: [120, 180],
    },
    {
      name: 'SoftGrid Everyday Hoodie',
      short: 'Midweight hoodie with a brushed interior and reinforced cuffs.',
      long: 'SoftGrid works as an outer layer on cool mornings and under a shell when it rains. The hood stays up in light wind. Kangaroo pocket is deep enough for a phone and gloves.',
      specs: { Material: '80% cotton / 20% poly', Weight: '320 gsm', Fit: 'Relaxed', Pockets: 'Kangaroo', Care: 'Machine wash' },
      price: [58, 88],
    },
    {
      name: 'LineForm Slim Chinos',
      short: 'Stretch chinos that hold a crease through a full workday.',
      long: 'LineForm uses a bit of elastane so sitting and stairs do not bag out the knees. Colorways stay office-safe. The rise sits at the natural waist without feeling dated.',
      specs: { Material: '97% cotton / 3% elastane', Fit: 'Slim', Rise: 'Mid', Pockets: '5', Care: 'Machine wash' },
      price: [64, 94],
    },
    {
      name: 'Coastal Linen Shirt',
      short: 'Breathable linen camp shirt for warm weather that still looks put together.',
      long: 'Coastal wrinkles honestly — that is part of the fabric. The camp collar skips a tie vibe for dinners outside. Side vents help when you tuck it in.',
      specs: { Material: '100% linen', Fit: 'Relaxed', Collar: 'Camp', Care: 'Wash cold, hang dry', Origin: 'India' },
      price: [72, 102],
    },
    {
      name: 'ArcFrame Sunglasses',
      short: 'Acetate sunglasses with polarized lenses and a medium fit.',
      long: 'ArcFrame blocks glare on water and windshields without darkening everything to a cave. The acetate holds adjustment well. Soft case and cloth are in the box.',
      specs: { Lenses: 'Polarized', UV: 'UV400', Frame: 'Acetate', Width: 'Medium', Includes: 'Case + cloth' },
      price: [85, 125],
    },
    {
      name: 'PackLite Rain Shell',
      short: 'Packable rain shell that stuffs into its own pocket for sudden showers.',
      long: 'PackLite sheds rain on bike rides and stadium nights. Pit zips dump heat when you are moving. Reflective hits on the shoulders help at dusk.',
      specs: { Waterproof: '10K mm', Breathability: '8K g/m2', Packs: 'Into pocket', Weight: '280g', Seams: 'Taped' },
      price: [110, 160],
    },
    {
      name: 'Dayloop Leather Belt',
      short: 'Full-grain leather belt with a low-profile buckle for trousers and jeans.',
      long: 'Dayloop is cut from a single piece so it does not peel after a year. Holes are cleanly punched. Width works with most dress and casual loops.',
      specs: { Material: 'Full-grain leather', Width: '1.25 in', Buckle: 'Brushed nickel', Sizes: '30-40', Origin: 'USA' },
      price: [45, 65],
    },
    {
      name: 'KnitPeak Beanie',
      short: 'Ribbed merino blend beanie that covers the ears without itching.',
      long: 'KnitPeak stays warm when wetter than wool hats that go limp. The cuff can fold for different depths. One size fits most adults.',
      specs: { Material: 'Merino blend', Style: 'Cuffed rib', Size: 'One size', Care: 'Hand wash', Lining: 'None' },
      price: [28, 42],
    },
    {
      name: 'StrideRun Daily Trainers',
      short: 'Cushioned trainers for easy miles and all-day walking.',
      long: 'StrideRun softens pavement without feeling unstable at a jog. The upper breathes enough for summer runs. Outsole rubber is placed where you actually wear through.',
      specs: { Drop: '8mm', Stack: '32mm heel', Upper: 'Engineered mesh', Use: 'Easy run / walk', Weight: '255g (M9)' },
      price: [95, 135],
    },
    {
      name: 'FieldDenim Straight Jeans',
      short: 'Mid-wash straight jeans with a bit of stretch and a clean finish.',
      long: 'FieldDenim sits between rigid heritage denim and skinny stretch. The mid wash hides everyday scuffs. Rise is modern without going ultra-high.',
      specs: { Material: '98% cotton / 2% elastane', Fit: 'Straight', Rise: 'Mid', Wash: 'Medium indigo', Care: 'Wash inside out' },
      price: [78, 118],
    },
    {
      name: 'CarrySling Crossbody',
      short: 'Compact crossbody for phone, wallet, and keys when a backpack is overkill.',
      long: 'CarrySling sits flat against the body and does not bounce when you walk. The main zip is RFID-lined for cards. Adjustable strap fits most torsos.',
      specs: { Material: 'Nylon ripstop', Volume: '2L', Closure: 'YKK zip', Strap: 'Adjustable', RFID: 'Yes' },
      price: [42, 62],
    },
    {
      name: 'WoolStep Ankle Socks (3pk)',
      short: 'Merino ankle socks in a three-pack for boots and sneakers.',
      long: 'WoolStep manages sweat better than cotton on long days. Seams sit away from the toes. The pack covers black, grey, and navy.',
      specs: { Material: 'Merino blend', Height: 'Ankle', Pack: '3 pairs', Cushion: 'Light', Care: 'Machine wash' },
      price: [24, 36],
    },
    {
      name: 'TailorZip Bomber Jacket',
      short: 'Unlined bomber with a matte finish for cool evenings.',
      long: 'TailorZip layers over shirts without looking sporty. Rib cuffs keep wind out at the wrists. Two hand pockets and an interior slip pocket cover the basics.',
      specs: { Shell: 'Nylon', Lining: 'Unlined', Closure: 'Zip', Pockets: '2 hand + 1 interior', Fit: 'Regular' },
      price: [130, 190],
    },
    {
      name: 'PalmWeave Straw Hat',
      short: 'Wide-brim straw hat with a chin cord for windy beach days.',
      long: 'PalmWeave shades face and neck without looking costume-y. The inner band wicks a bit of sweat. Cord stows when you do not need it.',
      specs: { Brim: '3.5 in', Material: 'Paper straw', Cord: 'Adjustable', Size: 'M/L', Band: 'Fabric sweatband' },
      price: [32, 48],
    },
    {
      name: 'StudioTee Heavyweight',
      short: 'Heavyweight cotton tee that keeps its shape after washes.',
      long: 'StudioTee uses a denser knit so it does not go sheer. Shoulders sit clean under overshirts. Available in colors that are not just black and white.',
      specs: { Material: '100% cotton', Weight: '220 gsm', Fit: 'Boxy regular', Neck: 'Rib crew', Care: 'Machine wash cold' },
      price: [34, 48],
    },
  ],
  'Sports & Fitness': [
    {
      name: 'GripForge Adjustable Dumbbells',
      short: 'Pair of adjustable dumbbells that replace a full rack up to 50 lb each.',
      long: 'GripForge dials weight in 5 lb steps so you are not swapping plates mid-set. The handle stays locked once selected. Footprint fits under a bench.',
      specs: { 'Weight Range': '5-50 lb each', Increments: '5 lb', Lock: 'Dial selector', Footprint: '16x8 in', Includes: 'Pair' },
      price: [249, 349],
    },
    {
      name: 'PaceBand Heart Rate Strap',
      short: 'Chest strap that feeds accurate heart rate to watches and bikes.',
      long: 'PaceBand beats wrist optical sensors on intervals. Battery lasts through a season of training. Soft strap does not chew into skin after an hour.',
      specs: { Battery: 'Replaceable CR2032', Connectivity: 'ANT+ / Bluetooth', Washable: 'Strap only', Fit: 'Adjustable', Waterproof: 'Swim OK' },
      price: [49, 79],
    },
    {
      name: 'MatForge Travel Yoga Mat',
      short: 'Foldable yoga mat with enough grip for hot rooms and travel packs.',
      long: 'MatForge folds instead of rolling so it fits suitcase corners. Texture holds in sweat without feeling sticky cold. Alignment marks are subtle.',
      specs: { Thickness: '4mm', Material: 'PU + natural rubber', Fold: 'Accordion', Weight: '1.1kg', Size: '68x24 in' },
      price: [58, 88],
    },
    {
      name: 'JumpLine Speed Rope',
      short: 'Adjustable speed rope with coated cable for gym floors.',
      long: 'JumpLine spins fast enough for double-unders without tangling every third skip. Handles are lightly textured. Cable length trims with a hex key.',
      specs: { Cable: 'Coated steel', Handles: 'Aluminum', Length: 'Adjustable to 10 ft', Bearings: 'Ball bearing', Weight: '180g' },
      price: [18, 32],
    },
    {
      name: 'HydraSoft Insulated Bottle 32oz',
      short: 'Insulated bottle that keeps water cold through long trail days.',
      long: 'HydraSoft fits car cup holders and most backpack side pockets. Straw and chug lids both come in the box. Powder coat hides scratches.',
      specs: { Capacity: '32oz', Insulation: '24h cold', Lid: 'Straw + chug', Material: 'Stainless 18/8', BPA: 'Free' },
      price: [28, 42],
    },
    {
      name: 'FormBench Folding Weight Bench',
      short: 'Folding flat/incline bench that stores upright in small apartments.',
      long: 'FormBench locks at multiple angles for presses and step-ups. Padding does not bottom out under heavy sets. Wheels help when you drag it out of a closet.',
      specs: { Positions: '6 incline + flat', Capacity: '600 lb', Pad: '2.5 in', Fold: 'Upright storage', Frame: 'Steel' },
      price: [149, 219],
    },
    {
      name: 'TrailPulse GPS Bike Computer',
      short: 'GPS bike computer with maps and long battery for weekend rides.',
      long: 'TrailPulse shows climbing and lap data without needing your phone on the bars. Maps load for common routes. Mount is out-front and solid over rough pavement.',
      specs: { Battery: '20 hours', Display: '2.5-inch', GPS: 'Multi-band', Maps: 'On-device', Mount: 'Out-front' },
      price: [179, 259],
    },
    {
      name: 'FlexBand Resistance Set',
      short: 'Five-band resistance set with handles and door anchor for home workouts.',
      long: 'FlexBand covers light warm-ups through heavier pulls. Labels on each band stop the guessing. Door anchor is padded so it does not chew paint.',
      specs: { Bands: '5 levels', Max: '150 lb combined', Includes: 'Handles, anchor, bag', Material: 'Latex', Length: '48 in' },
      price: [29, 49],
    },
    {
      name: 'CoreRoll Foam Roller',
      short: 'Firm foam roller for calves, quads, and mid-back after training.',
      long: 'CoreRoll is denser than the supermarket soft ones that do nothing. Surface texture digs in without feeling like a cheese grater. Hollow core makes it lighter to carry.',
      specs: { Length: '18 in', Diameter: '6 in', Density: 'Firm', Material: 'EVA foam', Weight: '520g' },
      price: [22, 36],
    },
    {
      name: 'SwimSeal Goggles',
      short: 'Low-profile swim goggles with anti-fog lenses and a soft gasket.',
      long: 'SwimSeal seals without a headache strap crank. Tint works indoors and outside. Nose bridge pieces cover most face shapes.',
      specs: { Lenses: 'Anti-fog UV', Fit: '3 nose bridges', Strap: 'Silicone', Case: 'Hard case', Tint: 'Smoke' },
      price: [24, 38],
    },
    {
      name: 'ClimbTape Athletic Tape (2pk)',
      short: 'Rigid athletic tape for fingers and joints during climbing sessions.',
      long: 'ClimbTape tears clean by hand and sticks through chalked sessions. Not stretchy kinesiology tape — this is the classic support stuff. Two rolls last a training block.',
      specs: { Width: '1.5 in', Length: '15 yd each', Pack: '2 rolls', Adhesive: 'Zinc oxide', Tear: 'Hand tear' },
      price: [12, 18],
    },
    {
      name: 'KickStep Agility Ladder',
      short: 'Flat agility ladder with carry bag for footwork drills.',
      long: 'KickStep stays flat so ankles do not catch rungs. Adjustable spacing covers different drills. Pegs keep it from sliding on turf.',
      specs: { Rungs: '12', Length: '20 ft', Material: 'Nylon + plastic', Bag: 'Included', Pegs: '4' },
      price: [19, 29],
    },
    {
      name: 'PowerGrip Lifting Straps',
      short: 'Cotton lifting straps for heavy pulls when grip fails first.',
      long: 'PowerGrip wraps the bar cleanly and releases without a fight. Length works for mixed grip and hook grip transitions. Wash them when chalk builds up.',
      specs: { Material: 'Cotton', Length: '22 in', Width: '1.5 in', Pair: 'Yes', Color: 'Black' },
      price: [14, 22],
    },
    {
      name: 'BalanceDisc Stability Pad',
      short: 'Inflatable balance disc for core work and ankle rehab drills.',
      long: 'BalanceDisc adds instability to planks and single-leg stands. Pump is included. Surface bumps give bare feet something to grip.',
      specs: { Diameter: '13 in', Material: 'PVC', Pump: 'Included', Use: 'Balance / rehab', 'Weight Limit': '300 lb' },
      price: [16, 26],
    },
    {
      name: 'RaceFuel Gel Pack (12)',
      short: 'Box of 12 energy gels with electrolytes for long runs and rides.',
      long: 'RaceFuel goes down without the gluey aftertaste of older gels. Caffeine options are labeled clearly. Tear notches actually open on the first try.',
      specs: { Servings: '12', Caffeine: 'Mixed (labeled)', Electrolytes: 'Sodium + potassium', Texture: 'Thin gel', Flavor: 'Assorted' },
      price: [26, 36],
    },
    {
      name: 'CourtGrip Basketball',
      short: 'Indoor/outdoor basketball with a consistent grip out of the box.',
      long: 'CourtGrip holds air well and does not feel plasticky on outdoor courts. Channel design helps fingertip control. Pump needle is taped to the box.',
      specs: { Size: '7 (29.5 in)', Surface: 'Indoor/outdoor', Material: 'Composite leather', Bladder: 'Butyl', Needle: 'Included' },
      price: [28, 44],
    },
    {
      name: 'StretchBar Doorway Trainer',
      short: 'Doorway pull-up bar with safety locks for home upper-body work.',
      long: 'StretchBar mounts without drilling and includes lock arms that catch if the door frame is wider than expected. Foam grips stay put. Remove it when guests need the doorway.',
      specs: { Capacity: '300 lb', Mount: 'Doorway no-drill', Grip: 'Foam', Width: '24-36 in frames', Includes: 'Lock arms' },
      price: [32, 48],
    },
  ],
  'Books & Stationery': [
    {
      name: 'Field Notes Memo Books (3pk)',
      short: 'Pocket memo books with graph paper for quick sketches and lists.',
      long: 'Field Notes fit a back pocket and take ink without heavy bleed-through. Covers survive bag abuse. Three-pack means one in the car, one on the desk, one in rotation.',
      specs: { Pages: '48 each', Paper: 'Graph', Size: '3.5x5.5 in', Pack: '3', Binding: 'Staple' },
      price: [12, 16],
    },
    {
      name: 'Inkwell Fountain Pen',
      short: 'Entry fountain pen with a smooth fine nib and a converter included.',
      long: 'Inkwell writes without the scratchiness cheaper pens start with. Converter means bottled ink instead of only cartridges. Cap posts securely while you write.',
      specs: { Nib: 'Fine steel', Fill: 'Cartridge/converter', Body: 'Resin', Includes: 'Converter', Color: 'Matte black' },
      price: [28, 45],
    },
    {
      name: 'Atlas Hardcover Notebook A5',
      short: 'Lay-flat A5 notebook with numbered pages and a contents index.',
      long: 'Atlas opens flat so you are not fighting the spine. Paper handles fountain pen ink with minimal ghosting. Elastic band keeps tickets shoved inside.',
      specs: { Size: 'A5', Pages: '192', Paper: '100 gsm', Binding: 'Sewn hardcover', Extras: 'Index + pocket' },
      price: [18, 28],
    },
    {
      name: 'DeskGrid Planner Undated',
      short: 'Undated weekly planner so a missed week does not waste pages.',
      long: 'DeskGrid gives a week on two pages with a notes column that is actually usable. Thick cover stands up on a desk. Stickers are not included — on purpose.',
      specs: { Layout: 'Weekly undated', Size: 'B5', Pages: '120', Paper: '90 gsm', Binding: 'Lay-flat' },
      price: [22, 32],
    },
    {
      name: 'TypeCase Novel: Harbor Lights',
      short: 'A coastal mystery about a radio operator who hears a distress call that should not exist.',
      long: 'Harbor Lights moves between a small-town marina and old shipping records. The pacing stays tight without cheap twists every chapter. Hardcover edition includes a map endpaper.',
      specs: { Format: 'Hardcover', Pages: '342', Genre: 'Mystery', Language: 'English', ISBN: '978-1-4028-9462-1' },
      price: [24, 32],
    },
    {
      name: 'SketchBlock Mixed Media Pad',
      short: 'Heavy mixed-media pad for ink, marker, and light watercolor studies.',
      long: 'SketchBlock takes wet media without warping into a potato chip. Spiral binding flips all the way back. Sixty sheets last longer than you expect.',
      specs: { Sheets: '60', Weight: '180 gsm', Size: '9x12 in', Binding: 'Spiral', Media: 'Ink/marker/watercolor' },
      price: [14, 22],
    },
    {
      name: 'MarkSet Highlighter Duo (6)',
      short: 'Dual-tip highlighters with chisel and fine ends in six muted colors.',
      long: 'MarkSet colors stay readable on photocopies instead of neon blinding. Caps click on firmly. Ink does not dry out if you forget one overnight.',
      specs: { Tips: 'Chisel + fine', Colors: '6 muted', Ink: 'Water-based', Pack: '6', Bleed: 'Low' },
      price: [10, 16],
    },
    {
      name: 'ShelfRead: Systems Thinking Intro',
      short: 'A practical intro to systems thinking for people who build products and teams.',
      long: 'Systems Thinking Intro uses workplace examples instead of abstract diagrams only. Chapters end with exercises you can run in a meeting. Paperback is pocketable for commute reading.',
      specs: { Format: 'Paperback', Pages: '256', Genre: 'Business / nonfiction', Language: 'English', Edition: '2nd' },
      price: [18, 26],
    },
    {
      name: 'ClipBoard Interview Pad',
      short: 'Slim clipboard with a storage compartment for forms and pens.',
      long: 'ClipBoard keeps candidate packets from blowing around in conference rooms. Low-profile clip does not leave deep dents on paper. Interior holds a few spare pens.',
      specs: { Size: 'Letter/A4', Clip: 'Low profile', Storage: 'Interior tray', Material: 'Plastic', Color: 'Charcoal' },
      price: [12, 18],
    },
    {
      name: 'GraphRight Engineering Pad',
      short: 'Green-tint engineering pad with 5x5 grid for sketches and calculations.',
      long: 'GraphRight tears clean at the top binding. Grid shows through lightly on the back for tracing. Fifty sheets per pad.',
      specs: { Grid: '5x5', Sheets: '50', Size: '8.5x11 in', Paper: 'Green tint', Binding: 'Tape top' },
      price: [8, 12],
    },
    {
      name: 'Letterpress Card Set',
      short: 'Set of eight letterpress thank-you cards with envelopes.',
      long: 'Letterpress cards have real impression depth you can feel. Blank insides leave room for a short note. Envelopes match without looking like office stock.',
      specs: { Cards: '8', Envelopes: '8', Print: 'Letterpress', Size: 'A2', Inside: 'Blank' },
      price: [16, 24],
    },
    {
      name: 'Archive Box Document File',
      short: 'Lidded document box for papers you are not ready to shred.',
      long: 'Archive Box stacks without crushing the ones underneath. Label window on the end face helps shelves stay sane. Holds letter and A4 folders.',
      specs: { Size: 'Letter/A4', Material: 'Board + cloth', Closure: 'Lid', Label: 'End window', Stackable: 'Yes' },
      price: [14, 22],
    },
    {
      name: 'PenCup Ceramic Desk Set',
      short: 'Two ceramic cups for pens and clips that do not look like office leftovers.',
      long: 'PenCup keeps the desk from turning into a drawer explosion. Weighted bases do not tip when you grab a pen. Matte glaze hides fingerprints.',
      specs: { Pieces: '2 cups', Material: 'Ceramic', Finish: 'Matte', Base: 'Weighted', Care: 'Wipe clean' },
      price: [26, 38],
    },
    {
      name: 'ReadLight Clip Book Light',
      short: 'Warm clip-on book light that does not bleed across the whole room.',
      long: 'ReadLight focuses on the page so partners can sleep. USB-C recharge lasts through a long flight. Clip fits hardcovers and thick paperbacks.',
      specs: { 'Battery Life': '8 hours', Temp: 'Warm white', Charge: 'USB-C', Clip: 'Up to 1 in', Modes: '3 brightness' },
      price: [18, 28],
    },
    {
      name: 'IndexTab Sticky Flags (120)',
      short: 'Writable sticky flags in four colors for marking textbooks and contracts.',
      long: 'IndexTab sticks and resticks without tearing pages. Writable surface takes ballpoint cleanly. Dispenser keeps them from turning into a tangled wad.',
      specs: { Flags: '120', Colors: '4', Writable: 'Yes', Dispenser: 'Included', Size: '1x1.7 in' },
      price: [6, 10],
    },
    {
      name: 'CaseStudy: Design Ops Handbook',
      short: 'A handbook on running design operations inside growing product teams.',
      long: 'Design Ops Handbook covers rituals, tooling choices, and hiring without pretending every company is a FAANG clone. Sidebars call out what fails in smaller orgs. Paperback with durable cover.',
      specs: { Format: 'Paperback', Pages: '288', Genre: 'Design / management', Language: 'English', Illustrations: 'Diagrams' },
      price: [29, 39],
    },
    {
      name: 'RulerSet Metal Architect',
      short: 'Stainless ruler set with cork backing so it does not slide on paper.',
      long: 'RulerSet includes 6, 12, and 18 inch pieces for layout work. Cork backing stops the skating. Etched markings will not rub off.',
      specs: { Lengths: '6/12/18 in', Material: 'Stainless', Backing: 'Cork', Markings: 'Etched', Units: 'Inch + cm' },
      price: [15, 24],
    },
  ],
  'Toys & Games': [
    {
      name: 'BrickForge Starter Build Set',
      short: '500-piece building set with gears and axles for moving models.',
      long: 'BrickForge pieces click with common brick systems kids already own. Instructions cover three builds, then leave room to invent. Sorted bags cut the floor-sorting phase.',
      specs: { Pieces: '500', Ages: '8+', Builds: '3 models', Compatibility: 'Standard brick', Includes: 'Gears + axles' },
      price: [39, 59],
    },
    {
      name: 'QuestTrail Board Game',
      short: 'Cooperative board game where players clear a trail before weather closes in.',
      long: 'QuestTrail plays in about 45 minutes and scales from two to four players. Rules teach in the first round instead of a booklet lecture. Components are sturdy cardboard, not flimsy punchboard.',
      specs: { Players: '2-4', Time: '45 min', Ages: '10+', Type: 'Cooperative', Components: 'Board + cards' },
      price: [34, 48],
    },
    {
      name: 'ZoomRacer Remote Car',
      short: 'All-terrain remote car with a rechargeable battery and spare shell.',
      long: 'ZoomRacer handles driveway gravel without flipping constantly. Range is honest for backyard use. Spare shell means the first crash is not the end.',
      specs: { Scale: '1:18', Battery: 'Rechargeable', Range: '50m', Runtime: '25 min', Ages: '6+' },
      price: [42, 68],
    },
    {
      name: 'PuzzleCoast 1000pc Map',
      short: '1000-piece coastal map puzzle with a poster reference sheet.',
      long: 'PuzzleCoast pieces have a tight fit without forcing. Color regions help when you are stuck in the ocean blues. Poster saves the box art from being destroyed.',
      specs: { Pieces: '1000', Size: '27x20 in finished', Material: 'Board', Reference: 'Poster', Ages: '12+' },
      price: [18, 28],
    },
    {
      name: 'SoftStack Nesting Blocks',
      short: 'Soft foam nesting blocks for toddlers that double as seat cushions.',
      long: 'SoftStack survives being sat on and thrown in a crib corner. Numbers and animals print on the sides. Wipe clean after snack incidents.',
      specs: { Pieces: '6', Material: 'EVA foam', Ages: '1-4', Clean: 'Wipeable', Storage: 'Nests together' },
      price: [24, 36],
    },
    {
      name: 'DeckCraft Strategy Cards',
      short: 'Two-player card game about building trade routes across a shared map.',
      long: 'DeckCraft games finish in 20 minutes, so rematches happen. Art is clear at arm length across a table. Expansion pack slot is printed on the tuck box for later.',
      specs: { Players: '2', Time: '20 min', Ages: '12+', Cards: '80', Type: 'Strategy' },
      price: [16, 24],
    },
    {
      name: 'SkyLine Foam Glider',
      short: 'Hand-launch foam glider that survives rough landings in parks.',
      long: 'SkyLine flies straight once you trim the tail tabs. Foam shrugs off tree hits better than balsa. No batteries, no pairing, no app.',
      specs: { Wingspan: '18 in', Material: 'EPP foam', Power: 'None', Ages: '5+', Assembly: 'Snap wings' },
      price: [12, 18],
    },
    {
      name: 'RobotKit Beginner Build',
      short: 'Beginner robot kit that walks and avoids edges with a simple sensor.',
      long: 'RobotKit teaches assembly without needing soldering. Battery pack is AA-based so you are not hunting a proprietary charger. Manual is illustrated step-by-step.',
      specs: { Power: '3x AA', Skills: 'Walk + edge detect', Ages: '10+', Tools: 'Screwdriver included', Time: '2-3 hours build' },
      price: [48, 72],
    },
    {
      name: 'MarbleRun Spiral Tower',
      short: 'Spiral marble run tower with gates that change the path mid-drop.',
      long: 'MarbleRun keeps kids experimenting after the first build. Gates click without needing glue. Marbles are large enough to avoid choke risk for the listed age.',
      specs: { Height: '2 ft', Marbles: '8 included', Ages: '5+', Material: 'ABS plastic', Gates: '4 adjustable' },
      price: [29, 44],
    },
    {
      name: 'CharadeBox Party Game',
      short: 'Fast party game of timed charades with category cards for mixed groups.',
      long: 'CharadeBox works for teens and adults without inside jokes required. Rounds stay short so quiet players get turns. Card stock holds up to snack hands.',
      specs: { Players: '4+', Time: '30 min', Ages: '14+', Cards: '200', Timer: 'Sand timer' },
      price: [22, 32],
    },
    {
      name: 'PlushOrbit Stuffed Planet',
      short: 'Soft plush planet with embroidered craters and a loop for hanging.',
      long: 'PlushOrbit is sized for kids to hug and for desks as a soft paperweight. Embroidery holds after washes better than printed fabric. Loop hangs from a backpack zipper.',
      specs: { Diameter: '8 in', Fill: 'Polyester', Care: 'Surface wash', Loop: 'Hang tab', Ages: '0+' },
      price: [18, 28],
    },
    {
      name: 'TrainTrack Wooden Set',
      short: 'Wooden train track expansion with bridges and a crossing gate.',
      long: 'TrainTrack fits the major wooden railway brands already in living rooms. Wood is smooth enough for little hands. Crossing gate actually lowers.',
      specs: { Pieces: '25', Material: 'Beech wood', Compatible: 'Major wooden brands', Ages: '3+', Includes: 'Bridge + gate' },
      price: [36, 54],
    },
    {
      name: 'ScienceLab Crystal Kit',
      short: 'Crystal growing kit with safe chemicals and a display stand.',
      long: 'ScienceLab grows crystals over a few days with clear instructions. Goggles are included. Stand shows off the result when it is done.',
      specs: { Experiments: '2 crystal types', Ages: '8+', Includes: 'Goggles + stand', Time: '3-5 days', Safety: 'Non-toxic formula' },
      price: [19, 29],
    },
    {
      name: 'DuelMini Table Football',
      short: 'Desktop foosball for two players that clamps to a table edge.',
      long: 'DuelMini is loud in a good way for office breaks. Clamp keeps it from walking off the desk mid-goal. Balls are included with two spares.',
      specs: { Players: '2', Mount: 'Table clamp', Balls: '3', Size: '24x12 in', Ages: '6+' },
      price: [45, 69],
    },
    {
      name: 'StoryDice Imagination Set',
      short: 'Nine illustrated dice that prompt silly story starters for kids.',
      long: 'StoryDice works for car rides and classrooms when attention is short. Icons are readable without tiny details. Cloth bag stores them.',
      specs: { Dice: '9', Ages: '5+', Bag: 'Cloth included', Material: 'Wood', Use: 'Story prompts' },
      price: [14, 22],
    },
    {
      name: 'BuildBot Magnetic Tiles (48)',
      short: 'Magnetic tile set for building towers, houses, and ramps.',
      long: 'BuildBot magnets are strong enough to hold taller builds without constant collapse. Tiles wipe clean. Idea cards start kids who need a nudge.',
      specs: { Pieces: '48', Ages: '3+', Magnets: 'Sealed edges', Cards: 'Idea cards', Material: 'ABS' },
      price: [32, 48],
    },
    {
      name: 'NightCamp Glow Tent',
      short: 'Indoor play tent with fiber glow strands for bedtime forts.',
      long: 'NightCamp pops up in minutes and packs into a carry sack. Glow strands run on USB and dim for sleep. Floor mat is included.',
      specs: { Size: '48x48x42 in', Power: 'USB glow', Ages: '3+', Pack: 'Carry sack', Includes: 'Floor mat' },
      price: [39, 59],
    },
  ],
}

function priceFor(range, id) {
  const [min, max] = range
  return min + ((id * 17) % (max - min + 1))
}

function ratingFor(id) {
  return Math.round((3 + ((id * 37) % 21) / 10) * 10) / 10
}

function stockFor(id) {
  return 5 + ((id * 13) % 96)
}

const colors = ['Black', 'Navy', 'Oak', 'Silver', 'Sand', 'Slate', 'Forest', 'Coral', 'Ivory', 'Copper']
const products = []
let id = 1

// 17 items per category in catalog; take first 17 of each for ~even 17/17/17/17/16/16... 
// Better: round-robin until 100
const indexes = Object.fromEntries(CATEGORIES.map((c) => [c, 0]))

while (products.length < 100) {
  for (const category of CATEGORIES) {
    if (products.length >= 100) break
    const items = catalog[category]
    const slot = indexes[category]
    const base = items[slot % items.length]
    const pass = Math.floor(slot / items.length)
    indexes[category]++

    let name = base.name
    if (pass > 0) {
      name = `${base.name} — ${colors[(id + pass) % colors.length]}`
    }

    products.push({
      id,
      name,
      category,
      price: priceFor(base.price, id),
      image: `https://picsum.photos/seed/product-${id}/600/600`,
      shortDescription: base.short,
      longDescription: base.long,
      specs: { ...base.specs },
      rating: ratingFor(id),
      stock: stockFor(id),
    })
    id++
  }
}

const out = join(__dirname, '..', 'src', 'data', 'products.json')
writeFileSync(out, JSON.stringify(products, null, 2) + '\n')

const counts = Object.fromEntries(CATEGORIES.map((c) => [c, products.filter((p) => p.category === c).length]))
console.log('Wrote', products.length, 'products')
console.log(counts)
console.log('Unique names:', new Set(products.map((p) => p.name)).size)
