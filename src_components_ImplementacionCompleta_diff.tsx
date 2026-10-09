--- src/components/ImplementacionCompleta.tsx (原始)


+++ src/components/ImplementacionCompleta.tsx (修改后)
import { useState } from 'react';

export default function ImplementacionCompleta() {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('codigo');

  const copyCode = () => {
    navigator.clipboard.writeText(ESP32_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const sections = [
    { id: 'codigo', label: 'Código Arduino', icon: '💻' },
    { id: 'materiales', label: 'Materiales', icon: '🛒' },
    { id: 'conexiones', label: 'Conexiones', icon: '🔌' },
    { id: 'instalacion', label: 'Instalación', icon: '⚙️' },
    { id: 'configuracion', label: 'Configuración', icon: '🔧' },
    { id: 'api', label: 'API Endpoints', icon: '🌐' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          📋 Guía Completa de Implementación
        </h2>
        <p className="text-slate-400">
          Todo lo que necesitas para armar tu sistema de alarmas ESP32
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
              activeSection === section.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-slate-800/50 text-slate-400 hover:text-white border border-slate-700/50'
            }`}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {activeSection === 'codigo' && <CodigoSection copied={copied} onCopy={copyCode} />}
      {activeSection === 'materiales' && <MaterialesSection />}
      {activeSection === 'conexiones' && <ConexionesSection />}
      {activeSection === 'instalacion' && <InstalacionSection />}
      {activeSection === 'configuracion' && <ConfiguracionSection />}
      {activeSection === 'api' && <APISection />}
    </div>
  );
}

// ==================== CÓDIGO ARDUINO ====================
function CodigoSection({ copied, onCopy }: { copied: boolean; onCopy: () => void }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">💻 Código Arduino para ESP32</h3>
        <button
          onClick={onCopy}
          className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
            copied ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'
          }`}
        >
          {copied ? '✅ ¡Copiado!' : '📋 Copiar Código'}
        </button>
      </div>

      <div className="bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
        <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">esp32_alarm_system_v2.ino</span>
          <span className="text-xs text-slate-500">{ESP32_CODE.split('\n').length} líneas</span>
        </div>
        <div className="overflow-auto max-h-[600px]">
          <pre className="p-4 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre">
            {ESP32_CODE}
          </pre>
        </div>
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <h4 className="font-bold text-blue-400 mb-2">📝 Instrucciones rápidas:</h4>
        <ol className="text-sm text-slate-300 space-y-1">
          <li>1. Copia todo el código de arriba</li>
          <li>2. Abre Arduino IDE</li>
          <li>3. Crea un nuevo sketch (Archivo → Nuevo)</li>
          <li>4. Pega el código</li>
          <li>5. Modifica WIFI_SSID, WIFI_PASS y GMT_OFFSET_SEC</li>
          <li>6. Conecta el ESP32 por USB</li>
          <li>7. Selecciona placa: ESP32 Dev Module</li>
          <li>8. Selecciona el puerto COM correcto</li>
          <li>9. Click en "Subir" (botón →)</li>
          <li>10. Abre Monitor Serie a 115200 baudios para ver la IP</li>
        </ol>
      </div>
    </div>
  );
}

// ==================== MATERIALES ====================
function MaterialesSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">🛒 Lista de Materiales</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { nombre: 'ESP32 DevKit V1', cantidad: '1', precio: '$5-8', especificaciones: 'WiFi integrado, 30 pines GPIO, 520KB SRAM, 4MB Flash' },
          { nombre: 'LCD 16x2 con módulo I2C', cantidad: '1', precio: '$3-5', especificaciones: 'PCF8574, dirección 0x27 o 0x3F, 16 columnas x 2 filas' },
          { nombre: 'Teclado Matricial 4x4', cantidad: '1', precio: '$2-3', especificaciones: '16 teclas, 8 pines (4 filas + 4 columnas)' },
          { nombre: 'Buzzer Activo 5V', cantidad: '1', precio: '$0.50', especificaciones: 'Activo (suena con voltaje), 5V, frecuencia fija' },
          { nombre: 'LED 5mm', cantidad: '1', precio: '$0.10', especificaciones: 'Cualquier color, ánodo largo (+), cátodo corto (-)' },
          { nombre: 'Resistencia 220Ω', cantidad: '1', precio: '$0.05', especificaciones: 'Para proteger el LED, bandas: rojo-rojo-marrón' },
          { nombre: 'Protoboard 400/830 puntos', cantidad: '1', precio: '$3-5', especificaciones: 'Para hacer conexiones sin soldar' },
          { nombre: 'Cables Dupont', cantidad: '20+', precio: '$2', especificaciones: 'Macho-macho y macho-hembra, 20cm' },
          { nombre: 'Cable micro USB', cantidad: '1', precio: '$2', especificaciones: 'Debe ser de DATOS (no solo carga)' },
          { nombre: 'Fuente 5V 2A (opcional)', cantidad: '1', precio: '$3', especificaciones: 'Para alimentar sin PC, con conector barrel o USB' },
        ].map((item, i) => (
          <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-white">{item.nombre}</h4>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                {item.precio}
              </span>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Cantidad: <span className="text-white">{item.cantidad}</span></div>
              <div>Especificaciones: <span className="text-blue-400">{item.especificaciones}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
        <h4 className="font-bold text-green-400 mb-2">💰 Costo Total Estimado</h4>
        <p className="text-2xl font-bold text-white">$20-30 USD</p>
        <p className="text-sm text-slate-400 mt-1">
          Puedes comprar todo en tiendas como AliExpress, Amazon, MercadoLibre o tiendas locales de electrónica.
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
        <h4 className="font-bold text-amber-400 mb-2">⚠️ Importante</h4>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• El buzzer debe ser <strong className="text-white">ACTIVO</strong> (no pasivo). El activo suena solo al darle voltaje.</li>
          <li>• El cable USB debe ser de <strong className="text-white">DATOS</strong>, no solo de carga. Si no, no podrás programar el ESP32.</li>
          <li>• El LCD I2C puede venir con dirección <strong className="text-white">0x27</strong> o <strong className="text-white">0x3F</strong>. Prueba ambas si no funciona.</li>
        </ul>
      </div>
    </div>
  );
}

// ==================== CONEXIONES ====================
function ConexionesSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">🔌 Diagrama de Conexiones</h3>

      {/* LCD */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-green-500/30">
        <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
          📺 LCD 16x2 I2C → ESP32
        </h4>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Pin LCD</th>
              <th className="text-left py-2 text-slate-400">Pin ESP32</th>
              <th className="text-left py-2 text-slate-400">Función</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            <tr><td className="py-2 text-white font-mono">GND</td><td className="py-2 text-red-400">GND</td><td className="py-2 text-slate-400">Tierra</td></tr>
            <tr><td className="py-2 text-white font-mono">VCC</td><td className="py-2 text-red-400">VIN (5V)</td><td className="py-2 text-slate-400">Alimentación 5V</td></tr>
            <tr><td className="py-2 text-white font-mono">SDA</td><td className="py-2 text-green-400">GPIO 21</td><td className="py-2 text-slate-400">Datos I2C</td></tr>
            <tr><td className="py-2 text-white font-mono">SCL</td><td className="py-2 text-green-400">GPIO 22</td><td className="py-2 text-slate-400">Clock I2C</td></tr>
          </tbody>
        </table>
      </div>

      {/* Teclado */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-purple-500/30">
        <h4 className="font-bold text-purple-400 mb-3 flex items-center gap-2">
          🎹 Teclado Matricial 4x4 → ESP32
        </h4>
        <p className="text-xs text-slate-400 mb-3">
          Los pines del teclado se cuentan de izquierda a derecha mirando el teclado de frente con los números arriba.
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-2 text-slate-400">Pin Teclado</th>
              <th className="text-left py-2 text-slate-400">Pin ESP32</th>
              <th className="text-left py-2 text-slate-400">Función</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            <tr><td className="py-2 text-white font-mono">Pin 1</td><td className="py-2 text-purple-400">GPIO 32</td><td className="py-2 text-slate-400">Row 1</td></tr>
            <tr><td className="py-2 text-white font-mono">Pin 2</td><td className="py-2 text-purple-400">GPIO 33</td><td className="py-2 text-slate-400">Row 2</td></tr>
            <tr><td className="py-2 text-white font-mono">Pin 3</td><td className="py-2 text-purple-400">GPIO 34</td><td className="py-2 text-slate-400">Row 3</td></tr>
            <tr><td className="py-2 text-white font-mono">Pin 4</td><td className="py-2 text-purple-400">GPIO 35</td><td className="py-2 text-slate-400">Row 4</td></tr>
            <tr><td className="py-2 text-white font-mono">Pin 5</td><td className="py-2 text-orange-400">GPIO 25</td><td className="py-2 text-slate-400">Col 1</td></tr>
            <tr><td className="py-2 text-white font-mono">Pin 6</td><td className="py-2 text-orange-400">GPIO 26</td><td className="py-2 text-slate-400">Col 2</td></tr>
            <tr><td className="py-2 text-white font-mono">Pin 7</td><td className="py-2 text-orange-400">GPIO 27</td><td className="py-2 text-slate-400">Col 3</td></tr>
            <tr><td className="py-2 text-white font-mono">Pin 8</td><td className="py-2 text-orange-400">GPIO 14</td><td className="py-2 text-slate-400">Col 4</td></tr>
          </tbody>
        </table>
      </div>

      {/* Buzzer y LED */}
      <div className="bg-slate-800/50 rounded-xl p-5 border border-yellow-500/30">
        <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
          🔊 Buzzer y LED → ESP32
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-bold text-white mb-2">Buzzer Activo</h5>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Pin largo (+) → <span className="text-yellow-400 font-mono">GPIO 18</span></li>
              <li>• Pin corto (-) → <span className="text-red-400">GND</span></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-2">LED</h5>
            <ul className="text-sm text-slate-300 space-y-1">
              <li>• Ánodo (pata larga +) → <span className="text-blue-400 font-mono">GPIO 2</span></li>
              <li>• Cátodo (pata corta -) → Resistencia 220Ω → <span className="text-red-400">GND</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
        <h4 className="font-bold text-red-400 mb-2">⚠️ ADVERTENCIAS</h4>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• <strong className="text-white">NUNCA</strong> conectes más de 5V al ESP32. Se quema inmediatamente.</li>
          <li>• Los pines GPIO 34 y 35 son <strong className="text-white">SOLO ENTRADA</strong>. No pueden ser salida.</li>
          <li>• La resistencia del LED es <strong className="text-white">OBLIGATORIA</strong>. Sin ella, el LED se quema.</li>
          <li>• Verifica la polaridad del buzzer y LED antes de conectar.</li>
        </ul>
      </div>
    </div>
  );
}

// ==================== INSTALACIÓN ====================
function InstalacionSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">⚙️ Instalación de Software</h3>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-blue-400 mb-3">Paso 1: Instalar Arduino IDE</h4>
        <ol className="text-sm text-slate-300 space-y-2">
          <li>1. Descarga Arduino IDE 2.x desde <a href="https://www.arduino.cc/en/software" target="_blank" rel="noopener" className="text-blue-400 underline">arduino.cc/en/software</a></li>
          <li>2. Instala normalmente (siguiente, siguiente, finalizar)</li>
          <li>3. Abre Arduino IDE</li>
        </ol>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-blue-400 mb-3">Paso 2: Agregar URL del ESP32</h4>
        <ol className="text-sm text-slate-300 space-y-2">
          <li>1. Ve a: <strong className="text-white">Archivo → Preferencias</strong></li>
          <li>2. En "URLs Adicionales de Gestor de Tarjetas", pega:</li>
        </ol>
        <div className="bg-slate-900 rounded-lg p-3 mt-2 font-mono text-xs text-green-400 break-all">
          https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
        </div>
        <ol className="text-sm text-slate-300 space-y-2 mt-2">
          <li>3. Click "OK"</li>
        </ol>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-blue-400 mb-3">Paso 3: Instalar placa ESP32</h4>
        <ol className="text-sm text-slate-300 space-y-2">
          <li>1. Ve a: <strong className="text-white">Herramientas → Placa → Gestor de Tarjetas</strong></li>
          <li>2. Busca: <strong className="text-white">"ESP32"</strong></li>
          <li>3. Instala: <strong className="text-white">"esp32 by Espressif Systems"</strong></li>
          <li>4. Espera a que termine la instalación (puede tardar varios minutos)</li>
        </ol>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-blue-400 mb-3">Paso 4: Instalar librerías necesarias</h4>
        <p className="text-sm text-slate-300 mb-3">
          Ve a: <strong className="text-white">Herramientas → Administrar Librerías</strong> y busca cada una:
        </p>
        <div className="space-y-2">
          {[
            { nombre: 'LiquidCrystal I2C', autor: 'Frank de Brabander', nota: 'Para el LCD' },
            { nombre: 'Keypad', autor: 'Mark Stanley', nota: 'Para el teclado matricial' },
            { nombre: 'ArduinoJson', autor: 'Benoit Blanchon', nota: 'Versión 6.x (NO 7.x)' },
          ].map((lib, i) => (
            <div key={i} className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-blue-400">{lib.nombre}</span>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">Instalar</span>
              </div>
              <div className="text-xs text-slate-400 mt-1">por {lib.autor} - {lib.nota}</div>
            </div>
          ))}
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-3 text-xs text-blue-300">
          💡 <strong>WiFi.h</strong> y <strong>WebServer.h</strong> ya vienen incluidas en el ESP32, no necesitas instalarlas.
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-blue-400 mb-3">Paso 5: Instalar driver USB (si es necesario)</h4>
        <p className="text-sm text-slate-300 mb-3">
          Si Windows no detecta el ESP32 al conectarlo por USB, necesitas instalar el driver:
        </p>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Si tu ESP32 tiene chip <strong className="text-white">CP2102</strong>: Descarga driver desde <a href="https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers" target="_blank" rel="noopener" className="text-blue-400 underline">silabs.com</a></li>
          <li>• Si tu ESP32 tiene chip <strong className="text-white">CH340</strong>: Descarga driver desde <a href="https://sparks.gogo.co.nz/ch340.html" target="_blank" rel="noopener" className="text-blue-400 underline">sparks.gogo.co.nz/ch340.html</a></li>
        </ul>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-3 text-xs text-amber-300">
          💡 Si no sabes qué chip tiene tu ESP32, prueba con ambos drivers. Uno de los dos funcionará.
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
        <h4 className="font-bold text-green-400 mb-2">✅ Verificación</h4>
        <p className="text-sm text-slate-300">
          Después de instalar todo, ve a <strong className="text-white">Herramientas → Placa</strong> y deberías ver <strong className="text-white">"ESP32 Dev Module"</strong> en la lista.
        </p>
      </div>
    </div>
  );
}

// ==================== CONFIGURACIÓN ====================
function ConfiguracionSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">🔧 Configuración del Código</h3>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-amber-500/30">
        <h4 className="font-bold text-amber-400 mb-3">⚠️ Antes de subir el código, modifica estas 3 cosas:</h4>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-white mb-3">1. Credenciales WiFi</h4>
        <p className="text-sm text-slate-300 mb-3">
          Cambia el nombre de tu red WiFi y la contraseña:
        </p>
        <pre className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
{`const char* WIFI_SSID = "NOMBRE_DE_TU_WIFI";
const char* WIFI_PASS = "CONTRASEÑA_DE_TU_WIFI";`}
        </pre>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-3 text-xs text-blue-300">
          💡 El ESP32 y el dispositivo desde donde accedas a la web deben estar en la <strong>misma red WiFi</strong>.
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-white mb-3">2. Zona Horaria (GMT Offset)</h4>
        <p className="text-sm text-slate-300 mb-3">
          Selecciona tu país y descomenta la línea correspondiente:
        </p>
        <pre className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
{`// Descomenta SOLO UNA línea según tu país:

const long GMT_OFFSET_SEC = -5 * 3600;  // Perú, Colombia, Ecuador, Panamá
// const long GMT_OFFSET_SEC = -6 * 3600;  // México (centro), Costa Rica, Guatemala
// const long GMT_OFFSET_SEC = -4 * 3600;  // Venezuela, Bolivia, Paraguay, República Dominicana
// const long GMT_OFFSET_SEC = -3 * 3600;  // Argentina, Uruguay, Chile, Brasil`}
        </pre>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mt-3 text-xs text-amber-300">
          ⚠️ Si la hora sale mal, verifica que elegiste la zona horaria correcta. También revisa que tu router tenga internet para que el NTP funcione.
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-white mb-3">3. Horas de las alarmas (opcional)</h4>
        <p className="text-sm text-slate-300 mb-3">
          Las horas por defecto están en el array <code className="bg-slate-900 px-2 py-0.5 rounded text-blue-400">alarmas[]</code>. Puedes modificarlas directamente en el código o después desde la web/teclado.
        </p>
        <pre className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
{`Alarma alarmas[NUM_ALARMAS] = {
  {1,  "Inicio Clases",    7,  0,  true, false, false, 0, 0},
  {2,  "Inicio Break 1",   9,  0,  true, false, false, 0, 0},
  {3,  "Fin Break 1",      9, 20,  true, false, false, 0, 0},
  {4,  "Inicio Almuerzo", 12,  0,  true, false, false, 0, 0},
  {5,  "Fin Almuerzo",    13,  0,  true, false, false, 0, 0},
  {6,  "Inicio Break 2",  15,  0,  true, false, false, 0, 0},
  {7,  "Fin Break 2",     15, 20,  true, false, false, 0, 0},
  {8,  "Inicio Cena",     18,  0,  true, false, false, 0, 0},
  {9,  "Fin Cena",        19,  0,  true, false, false, 0, 0},
  {10, "Alarma Dormir 1", 20, 30,  true, false, false, 0, 0},
  {11, "Alarma Dormir 2", 21,  0,  true, false, false, 0, 0},
  {12, "Alarma Dormir 3", 21, 30,  true, false, false, 0, 0}
};`}
        </pre>
        <div className="text-xs text-slate-400 mt-3">
          Formato: <code className="bg-slate-900 px-1 rounded text-blue-400">{'{id, nombre, hora, minuto, activa, sonando, snoozed, snoozeMinutos, ultimoSonido}'}</code>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-white mb-3">4. Dirección I2C del LCD (si no funciona)</h4>
        <p className="text-sm text-slate-300 mb-3">
          Si el LCD no enciende, prueba cambiar la dirección I2C:
        </p>
        <pre className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
{`// Prueba con 0x27 (la más común):
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Si no funciona, prueba con 0x3F:
LiquidCrystal_I2C lcd(0x3F, 16, 2);`}
        </pre>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
        <h4 className="font-bold text-green-400 mb-2">✅ Después de modificar</h4>
        <p className="text-sm text-slate-300">
          Guarda el sketch (Ctrl+S), conecta el ESP32 por USB, selecciona la placa y el puerto, y haz click en "Subir".
        </p>
      </div>
    </div>
  );
}

// ==================== API ====================
function APISection() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white">🌐 Endpoints de la API REST</h3>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <p className="text-sm text-slate-300">
          El ESP32 tiene un servidor web integrado. Usa estos endpoints desde la Web App o App Inventor para controlar las alarmas.
        </p>
        <p className="text-sm text-slate-300 mt-2">
          <strong className="text-white">URL base:</strong> <code className="bg-slate-900 px-2 py-0.5 rounded text-green-400">http://{'<IP_DEL_ESP32>'}</code>
        </p>
      </div>

      <div className="space-y-3">
        {[
          {
            method: 'GET',
            endpoint: '/status',
            desc: 'Obtener estado actual del sistema',
            response: '{"hora_actual":"14:30:25","wifi_status":true,"ip":"192.168.1.100","sistema_silenciado":false,"alarmas":[...]}'
          },
          {
            method: 'POST',
            endpoint: '/setAlarms',
            desc: 'Configurar horas de alarmas',
            body: '{"alarmas":[{"id":1,"hour":7,"minute":0,"enabled":true},...]}',
            response: '{"status":"ok","message":"Alarmas actualizadas"}'
          },
          {
            method: 'POST',
            endpoint: '/syncTime',
            desc: 'Forzar sincronización NTP de la hora',
            response: '{"status":"ok","message":"Hora sincronizada"}'
          },
          {
            method: 'POST',
            endpoint: '/silenciar',
            desc: 'Silenciar todas las alarmas del día',
            response: '{"status":"ok","message":"Sistema silenciado"}'
          },
          {
            method: 'POST',
            endpoint: '/reactivar',
            desc: 'Reactivar alarmas después de silenciar',
            response: '{"status":"ok","message":"Sistema reactivado"}'
          },
          {
            method: 'POST',
            endpoint: '/testBuzzer',
            desc: 'Probar buzzer por 3 segundos',
            response: '{"status":"ok","message":"Buzzer testeando 3s"}'
          },
          {
            method: 'POST',
            endpoint: '/cancelar',
            desc: 'Cancelar alarma en curso',
            response: '{"status":"ok","message":"Alarma cancelada"}'
          },
          {
            method: 'GET',
            endpoint: '/',
            desc: 'Página web de control (interfaz simple)',
            response: 'HTML con botones de control'
          },
        ].map((ep, i) => (
          <div key={i} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30">
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                ep.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {ep.method}
              </span>
              <code className="font-mono font-bold text-white">{ep.endpoint}</code>
            </div>
            <p className="text-sm text-slate-300 mb-2">{ep.desc}</p>
            {ep.body && (
              <div className="mb-2">
                <div className="text-xs text-slate-500 mb-1">Body:</div>
                <pre className="bg-slate-900 rounded p-2 text-xs font-mono text-green-400 overflow-x-auto">
                  {ep.body}
                </pre>
              </div>
            )}
            <div>
              <div className="text-xs text-slate-500 mb-1">Respuesta:</div>
              <pre className="bg-slate-900 rounded p-2 text-xs font-mono text-blue-400 overflow-x-auto">
                {ep.response}
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/30">
        <h4 className="font-bold text-white mb-3">📋 Ejemplo completo: Configurar alarmas desde JavaScript</h4>
        <pre className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-green-400 overflow-x-auto">
{`// Enviar configuración al ESP32
const ESP32_IP = "192.168.1.100"; // Cambia por la IP de tu ESP32

const alarmas = [
  {id: 1, hour: 7, minute: 0, enabled: true},
  {id: 2, hour: 9, minute: 0, enabled: true},
  {id: 3, hour: 9, minute: 20, enabled: true},
  // ... todas las alarmas
];

fetch(\`http://\${ESP32_IP}/setAlarms\`, {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({alarmas})
})
.then(response => response.json())
.then(data => console.log('Respuesta:', data))
.catch(error => console.error('Error:', error));`}
        </pre>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
        <h4 className="font-bold text-amber-400 mb-2">⚠️ CORS (Cross-Origin Resource Sharing)</h4>
        <p className="text-sm text-slate-300">
          Si accedes a la web desde un dominio diferente al ESP32, el navegador puede bloquear las peticiones por seguridad (CORS).
        </p>
        <p className="text-sm text-slate-300 mt-2">
          <strong className="text-white">Solución:</strong> El código del ESP32 ya tiene <code className="bg-slate-900 px-2 py-0.5 rounded text-green-400">server.enableCORS(true)</code> activado, así que no deberías tener problemas.
        </p>
      </div>
    </div>
  );
}

// ==================== CÓDIGO COMPLETO ====================
const ESP32_CODE = `/*
 * ============================================================
 *   ESP32 ALARM SYSTEM v2.0 - SISTEMA DE ALARMAS ESCOLAR
 *   Control Operativo por Teclado + Configuración por Web
 * ============================================================
 *
 *   ARQUITECTURA DEL SISTEMA:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  Web App / App Inventor  →  Configura HORAS        │
 *   │  Teclado Matricial       →  Control OPERATIVO       │
 *   │  ESP32                   →  Ejecuta y suena         │
 *   └─────────────────────────────────────────────────────┘
 *
 *   Hardware:
 *   - ESP32 DevKit V1
 *   - LCD 16x2 I2C (PCF8574) - SDA: GPIO21, SCL: GPIO22
 *   - Teclado Matricial 4x4 - Pines: 32,33,34,35,25,26,27,14
 *   - Buzzer activo - Pin: GPIO18
 *   - LED indicador - Pin: GPIO2
 *
 *   ═══ FUNCIONES DEL TECLADO MATRICIAL (CONTROL OPERATIVO) ═══
 *
 *   Tecla (*)  → CANCELAR alarma en curso
 *   Tecla (#)  → SNOOZE / Posponer alarma 5 minutos
 *   Tecla (A)  → SILENCIAR todas las alarmas del día
 *   Tecla (B)  → REACTIVAR alarmas del día
 *   Tecla (C)  → PROBAR alarma manualmente (3 segundos)
 *   Tecla (D)  → MOSTRAR estado de alarmas
 *   Combo (1+2+3) → RESET DE FÁBRICA
 *
 *   ═══ CONFIGURACIÓN POR WEB (HORAS) ═══
 *
 *   POST /setAlarms  → Recibe JSON con horas de alarmas
 *   GET  /status     → Devuelve estado actual
 *   POST /syncTime   → Fuerza sincronización NTP
 *   GET  /           → Página web de estado
 *
 * ============================================================
 */

#include <WiFi.h>
#include <WebServer.h>
#include <NTPClient.h>
#include <WiFiUdp.h>
#include <LiquidCrystal_I2C.h>
#include <Keypad.h>
#include <ArduinoJson.h>
#include <time.h>

// ==================== CONFIGURACIÓN WiFi ====================
const char* WIFI_SSID = "TU_RED_WIFI";
const char* WIFI_PASS = "TU_CONTRASEÑA";

// ==================== CONFIGURACIÓN NTP ====================
const char* NTP_SERVER = "pool.ntp.org";
const long GMT_OFFSET_SEC = -5 * 3600;  // UTC-5 (Perú/Colombia/Ecuador)
// Cambiar según tu zona horaria:
// UTC-5 (Perú, Colombia, Ecuador): -5 * 3600
// UTC-6 (México Centro): -6 * 3600
// UTC-4 (Venezuela, Bolivia): -4 * 3600
// UTC-3 (Argentina, Uruguay): -3 * 3600
const int DAYLIGHT_OFFSET_SEC = 0;

// ==================== PINES ====================
#define BUZZER_PIN    18
#define LED_PIN       2
#define LCD_SDA       21
#define LCD_SCL       22

// ==================== LCD ====================
LiquidCrystal_I2C lcd(0x27, 16, 2);

// ==================== TECLADO MATRICIAL 4x4 ====================
const byte ROWS = 4;
const byte COLS = 4;
char keys[ROWS][COLS] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};
byte rowPins[ROWS] = {32, 33, 34, 35};
byte colPins[COLS] = {25, 26, 27, 14};
Keypad keypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

// ==================== ESTRUCTURA DE ALARMAS ====================
#define NUM_ALARMAS 12

struct Alarma {
  int id;
  const char* nombre;
  int hora;
  int minuto;
  bool activa;
  bool sonando;
  bool snoozed;
  int snoozeMinutos;
  unsigned long ultimoSonido;
};

Alarma alarmas[NUM_ALARMAS] = {
  {1,  "Inicio Clases",    7,  0,  true, false, false, 0, 0},
  {2,  "Inicio Break 1",   9,  0,  true, false, false, 0, 0},
  {3,  "Fin Break 1",      9, 20,  true, false, false, 0, 0},
  {4,  "Inicio Almuerzo", 12,  0,  true, false, false, 0, 0},
  {5,  "Fin Almuerzo",    13,  0,  true, false, false, 0, 0},
  {6,  "Inicio Break 2",  15,  0,  true, false, false, 0, 0},
  {7,  "Fin Break 2",     15, 20,  true, false, false, 0, 0},
  {8,  "Inicio Cena",     18,  0,  true, false, false, 0, 0},
  {9,  "Fin Cena",        19,  0,  true, false, false, 0, 0},
  {10, "Alarma Dormir 1", 20, 30,  true, false, false, 0, 0},
  {11, "Alarma Dormir 2", 21,  0,  true, false, false, 0, 0},
  {12, "Alarma Dormir 3", 21, 30,  true, false, false, 0, 0}
};

// ==================== VARIABLES GLOBALES ====================
WebServer server(80);
bool sistemaSilenciado = false;
unsigned long silencioInicio = 0;
int alarmaSonandoActual = -1;
unsigned long testBuzzerInicio = 0;
bool testeandoBuzzer = false;

char ultimaTecla = 0;
char penultimaTecla = 0;
char anteultimaTecla = 0;
unsigned long ultimaTeclaTiempo = 0;
#define COMBO_TIMEOUT 2000

unsigned long lastLCDUpdate = 0;
unsigned long lastAlarmCheck = 0;
unsigned long lastScrollTime = 0;
int currentAlarmDisplay = 0;

char mensajeLCD[17] = "";
unsigned long mensajeLCDInicio = 0;
#define MENSAJE_DURACION 3000

// ==================== SETUP ====================
void setup() {
  Serial.begin(115200);
  Serial.println("\\n=== ESP32 ALARM SYSTEM v2.0 ===");

  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(LED_PIN, OUTPUT);
  digitalWrite(LED_PIN, LOW);

  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print(" ESP32 ALARM   ");
  lcd.setCursor(0, 1);
  lcd.print("  System v2.0  ");

  beep(200); delay(300);
  beep(200); delay(300);
  beep(300);

  conectarWiFi();
  configurarNTP();
  iniciarServidorWeb();

  mostrarMensaje("Sistema Listo!", "Web+Teclado OK");
  delay(2000);
  lcd.clear();

  Serial.println("Sistema iniciado correctamente");
  Serial.print("IP del ESP32: ");
  Serial.println(WiFi.localIP());
}

// ==================== LOOP PRINCIPAL ====================
void loop() {
  server.handleClient();

  if (millis() - lastLCDUpdate >= 1000) {
    lastLCDUpdate = millis();
    actualizarLCD();
  }

  if (millis() - lastAlarmCheck >= 1000) {
    lastAlarmCheck = millis();
    verificarAlarmas();
  }

  leerTecladoOperativo();
  manejarSonido();

  if (testeandoBuzzer && millis() - testBuzzerInicio >= 3000) {
    testeandoBuzzer = false;
    noTone(BUZZER_PIN);
    digitalWrite(LED_PIN, LOW);
  }

  if (millis() - lastScrollTime >= 3000) {
    lastScrollTime = millis();
    currentAlarmDisplay = (currentAlarmDisplay + 1) % NUM_ALARMAS;
  }
}

// ================================================================
// ══════════ FUNCIONES DEL TECLADO (CONTROL OPERATIVO) ══════════
// ================================================================

void leerTecladoOperativo() {
  char key = keypad.getKey();
  if (!key) return;

  Serial.printf("[TECLADO] Tecla: %c\\n", key);

  if (millis() - ultimaTeclaTiempo > COMBO_TIMEOUT) {
    anteultimaTecla = 0;
    penultimaTecla = 0;
    ultimaTecla = 0;
  }
  anteultimaTecla = penultimaTecla;
  penultimaTecla = ultimaTecla;
  ultimaTecla = key;
  ultimaTeclaTiempo = millis();

  if (anteultimaTecla == '1' && penultimaTecla == '2' && ultimaTecla == '3') {
    resetFabrica();
    return;
  }

  switch (key) {
    case '*': cancelarAlarma(); break;
    case '#': snoozeAlarma(); break;
    case 'A': silenciarTodo(); break;
    case 'B': reactivarAlarmas(); break;
    case 'C': probarAlarma(); break;
    case 'D': mostrarEstado(); break;
    default: break;
  }
}

void cancelarAlarma() {
  if (alarmaSonandoActual >= 0) {
    alarmas[alarmaSonandoActual].sonando = false;
    noTone(BUZZER_PIN);
    digitalWrite(LED_PIN, LOW);
    mostrarMensaje("ALARMA CANCELADA", alarmas[alarmaSonandoActual].nombre);
    alarmaSonandoActual = -1;
    beep(100); delay(150); beep(100); delay(150); beep(100);
  } else {
    mostrarMensaje("Sin alarma activa", "");
    beep(200);
  }
}

void snoozeAlarma() {
  if (alarmaSonandoActual >= 0) {
    int idx = alarmaSonandoActual;
    alarmas[idx].sonando = false;
    noTone(BUZZER_PIN);
    digitalWrite(LED_PIN, LOW);
    alarmas[idx].snoozed = true;
    alarmas[idx].snoozeMinutos = 5;
    int nuevaHora = alarmas[idx].hora;
    int nuevoMin = alarmas[idx].minuto + 5;
    if (nuevoMin >= 60) { nuevoMin -= 60; nuevaHora = (nuevaHora + 1) % 24; }
    alarmas[idx].hora = nuevaHora;
    alarmas[idx].minuto = nuevoMin;
    mostrarMensaje("SNOOZE +5min", alarmas[idx].nombre);
    alarmaSonandoActual = -1;
    beep(300);
  } else {
    mostrarMensaje("Sin alarma activa", "para posponer");
    beep(200);
  }
}

void silenciarTodo() {
  sistemaSilenciado = true;
  silencioInicio = millis();
  if (alarmaSonandoActual >= 0) {
    alarmas[alarmaSonandoActual].sonando = false;
    noTone(BUZZER_PIN);
    digitalWrite(LED_PIN, LOW);
    alarmaSonandoActual = -1;
  }
  mostrarMensaje("SILENCIADO", "Alarmas OFF hoy");
  tone(BUZZER_PIN, 500, 500);
}

void reactivarAlarmas() {
  if (sistemaSilenciado) {
    sistemaSilenciado = false;
    mostrarMensaje("REACTIVADO", "Alarmas ON");
    beep(200); delay(200); beep(300);
  } else {
    mostrarMensaje("Ya estan activas", "las alarmas");
    beep(150);
  }
}

void probarAlarma() {
  testeandoBuzzer = true;
  testBuzzerInicio = millis();
  mostrarMensaje("PROBANDO...", "Buzzer 3 seg");
  digitalWrite(LED_PIN, HIGH);
  tone(BUZZER_PIN, 1000);
}

void mostrarEstado() {
  int activas = 0;
  for (int i = 0; i < NUM_ALARMAS; i++) {
    if (alarmas[i].activa) activas++;
  }
  char linea1[17], linea2[17];
  snprintf(linea1, sizeof(linea1), "Activas: %d/%d", activas, NUM_ALARMAS);
  snprintf(linea2, sizeof(linea2), "%s | WiFi:%s", sistemaSilenciado ? "SILENC" : "ACTIVO", WiFi.status() == WL_CONNECTED ? "OK" : "X");
  mostrarMensaje(linea1, linea2);
  beep(150);
}

void resetFabrica() {
  int horasDefault[][2] = {{7,0},{9,0},{9,20},{12,0},{13,0},{15,0},{15,20},{18,0},{19,0},{20,30},{21,0},{21,30}};
  for (int i = 0; i < NUM_ALARMAS; i++) {
    alarmas[i].hora = horasDefault[i][0];
    alarmas[i].minuto = horasDefault[i][1];
    alarmas[i].activa = true;
    alarmas[i].sonando = false;
    alarmas[i].snoozed = false;
  }
  sistemaSilenciado = false;
  alarmaSonandoActual = -1;
  noTone(BUZZER_PIN);
  digitalWrite(LED_PIN, LOW);
  mostrarMensaje("RESET FABRICA!", "Horas restauradas");
  beep(300); delay(300); beep(300); delay(300); beep(500);
}

// ================================================================
// ══════════ FUNCIONES DE ALARMA Y SONIDO ══════════════════════
// ================================================================

void verificarAlarmas() {
  if (sistemaSilenciado) return;
  struct timeinfo timeinfo;
  if (!getLocalTime(&timeinfo)) return;
  int horaActual = timeinfo.tm_hour;
  int minutoActual = timeinfo.tm_min;
  int segundoActual = timeinfo.tm_sec;

  for (int i = 0; i < NUM_ALARMAS; i++) {
    if (alarmas[i].activa && alarmas[i].hora == horaActual && alarmas[i].minuto == minutoActual && segundoActual == 0 && !alarmas[i].sonando && alarmaSonandoActual < 0) {
      alarmas[i].sonando = true;
      alarmas[i].ultimoSonido = millis();
      alarmaSonandoActual = i;
      alarmas[i].snoozed = false;
      digitalWrite(LED_PIN, HIGH);
    }
  }
}

void manejarSonido() {
  if (alarmaSonandoActual < 0) return;
  int idx = alarmaSonandoActual;
  if (millis() - alarmas[idx].ultimoSonido < 30000) {
    unsigned long elapsed = (millis() - alarmas[idx].ultimoSonido) % 1500;
    if (elapsed < 400) { tone(BUZZER_PIN, 1000); digitalWrite(LED_PIN, HIGH); }
    else if (elapsed < 800) { tone(BUZZER_PIN, 1500); digitalWrite(LED_PIN, LOW); }
    else if (elapsed < 1200) { tone(BUZZER_PIN, 1000); digitalWrite(LED_PIN, HIGH); }
    else { noTone(BUZZER_PIN); digitalWrite(LED_PIN, LOW); }
  } else {
    alarmas[idx].sonando = false;
    noTone(BUZZER_PIN);
    digitalWrite(LED_PIN, LOW);
    alarmaSonandoActual = -1;
  }
}

// ================================================================
// ══════════ FUNCIONES DEL LCD ══════════════════════════════════
// ================================================================

void actualizarLCD() {
  if (mensajeLCDInicio > 0 && millis() - mensajeLCDInicio < MENSAJE_DURACION) return;
  else if (mensajeLCDInicio > 0) { mensajeLCDInicio = 0; lcd.clear(); }

  struct timeinfo timeinfo;
  if (!getLocalTime(&timeinfo)) return;

  lcd.setCursor(0, 0);
  char horaStr[17];
  snprintf(horaStr, sizeof(horaStr), "%02d:%02d:%02d  %s %s", timeinfo.tm_hour, timeinfo.tm_min, timeinfo.tm_sec, sistemaSilenciado ? "MUTE" : " ON ", WiFi.status() == WL_CONNECTED ? "W" : "X");
  lcd.print(horaStr);

  lcd.setCursor(0, 1);
  if (alarmaSonandoActual >= 0) {
    char alarmStr[17];
    snprintf(alarmStr, sizeof(alarmStr), ">>%s<<", alarmas[alarmaSonandoActual].nombre);
    alarmStr[16] = '\\0';
    lcd.print(alarmStr);
  } else if (testeandoBuzzer) {
    lcd.print("  TEST BUZZER   ");
  } else {
    int proxima = encontrarProximaAlarma(timeinfo.tm_hour, timeinfo.tm_min);
    if (proxima >= 0) {
      int minActual = timeinfo.tm_hour * 60 + timeinfo.tm_min;
      int minAlarma = alarmas[proxima].hora * 60 + alarmas[proxima].minuto;
      int diff = minAlarma - minActual;
      if (diff <= 0) diff += 1440;
      char proxStr[17];
      if (diff < 60) snprintf(proxStr, sizeof(proxStr), ">%s %dm", alarmas[proxima].nombre, diff);
      else snprintf(proxStr, sizeof(proxStr), ">%s %02d:%02d", alarmas[proxima].nombre, alarmas[proxima].hora, alarmas[proxima].minuto);
      proxStr[16] = '\\0';
      lcd.print(proxStr);
    } else {
      lcd.print(" Sin alarmas     ");
    }
  }
}

void mostrarMensaje(const char* linea1, const char* linea2) {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(linea1);
  lcd.setCursor(0, 1);
  lcd.print(linea2);
  mensajeLCDInicio = millis();
}

// ================================================================
// ══════════ SERVIDOR WEB ═══════════════════════════════════════
// ================================================================

void iniciarServidorWeb() {
  server.on("/status", HTTP_GET, []() {
    StaticJsonDocument<2048> doc;
    struct timeinfo timeinfo;
    getLocalTime(&timeinfo);
    doc["hora_actual"] = String(timeinfo.tm_hour) + ":" + String(timeinfo.tm_min) + ":" + String(timeinfo.tm_sec);
    doc["wifi_status"] = WiFi.status() == WL_CONNECTED;
    doc["ip"] = WiFi.localIP().toString();
    doc["sistema_silenciado"] = sistemaSilenciado;
    JsonArray alarmasArray = doc.createNestedArray("alarmas");
    for (int i = 0; i < NUM_ALARMAS; i++) {
      JsonObject a = alarmasArray.createNestedObject();
      a["id"] = alarmas[i].id;
      a["nombre"] = alarmas[i].nombre;
      a["hora"] = alarmas[i].hora;
      a["minuto"] = alarmas[i].minuto;
      a["activa"] = alarmas[i].activa;
    }
    String response;
    serializeJson(doc, response);
    server.send(200, "application/json", response);
  });

  server.on("/setAlarms", HTTP_POST, []() {
    if (server.hasArg("plain")) {
      String body = server.arg("plain");
      StaticJsonDocument<2048> doc;
      DeserializationError error = deserializeJson(doc, body);
      if (!error) {
        JsonArray alarmasArray = doc["alarmas"];
        for (JsonObject a : alarmasArray) {
          int id = a["id"];
          if (id >= 1 && id <= NUM_ALARMAS) {
            alarmas[id - 1].hora = a["hour"];
            alarmas[id - 1].minuto = a["minute"];
            alarmas[id - 1].activa = a["enabled"];
          }
        }
        mostrarMensaje("WEB: Actualizado!", "Alarmas sync OK");
        beep(200); delay(200); beep(200); delay(200); beep(300);
        server.send(200, "application/json", "{\\"status\\":\\"ok\\"}");
      } else {
        server.send(400, "application/json", "{\\"status\\":\\"error\\"}");
      }
    }
  });

  server.on("/syncTime", HTTP_POST, []() { configurarNTP(); server.send(200, "application/json", "{\\"status\\":\\"ok\\"}"); });
  server.on("/silenciar", HTTP_POST, []() { silenciarTodo(); server.send(200, "application/json", "{\\"status\\":\\"ok\\"}"); });
  server.on("/reactivar", HTTP_POST, []() { reactivarAlarmas(); server.send(200, "application/json", "{\\"status\\":\\"ok\\"}"); });
  server.on("/testBuzzer", HTTP_POST, []() { probarAlarma(); server.send(200, "application/json", "{\\"status\\":\\"ok\\"}"); });
  server.on("/cancelar", HTTP_POST, []() { cancelarAlarma(); server.send(200, "application/json", "{\\"status\\":\\"ok\\"}"); });

  server.on("/", HTTP_GET, []() {
    String html = "<html><head><meta charset='UTF-8'><title>ESP32 Alarmas</title></head><body>";
    html += "<h1>ESP32 Alarm System v2.0</h1>";
    struct timeinfo timeinfo;
    getLocalTime(&timeinfo);
    html += "<p>Hora: " + String(timeinfo.tm_hour) + ":" + String(timeinfo.tm_min) + "</p>";
    html += "<p>IP: " + WiFi.localIP().toString() + "</p>";
    html += "<button onclick=\\"fetch('/silenciar',{method:'POST'})\\">Silenciar</button>";
    html += "<button onclick=\\"fetch('/reactivar',{method:'POST'})\\">Reactivar</button>";
    html += "</body></html>";
    server.send(200, "text/html", html);
  });

  server.enableCORS(true);
  server.begin();
}

// ================================================================
// ══════════ FUNCIONES AUXILIARES ═══════════════════════════════
// ================================================================

void conectarWiFi() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Conectando WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  int intentos = 0;
  while (WiFi.status() != WL_CONNECTED && intentos < 30) { delay(500); intentos++; }
  if (WiFi.status() == WL_CONNECTED) {
    mostrarMensaje("WiFi Conectado!", WiFi.localIP().toString().c_str());
    beep(500);
  } else {
    mostrarMensaje("WiFi Error!", "Modo Offline");
    beep(1000);
  }
  delay(2000);
}

void configurarNTP() {
  configTime(GMT_OFFSET_SEC, DAYLIGHT_OFFSET_SEC, NTP_SERVER);
  struct timeinfo timeinfo;
  int intentos = 0;
  while (!getLocalTime(&timeinfo) && intentos < 20) { delay(500); intentos++; }
}

int encontrarProximaAlarma(int horaActual, int minutoActual) {
  int minutosActual = horaActual * 60 + minutoActual;
  int proximaIdx = -1;
  int menorDiff = 1440;
  for (int i = 0; i < NUM_ALARMAS; i++) {
    if (!alarmas[i].activa) continue;
    int minutosAlarma = alarmas[i].hora * 60 + alarmas[i].minuto;
    int diff = minutosAlarma - minutosActual;
    if (diff <= 0) diff += 1440;
    if (diff < menorDiff) { menorDiff = diff; proximaIdx = i; }
  }
  return proximaIdx;
}

void beep(int duracion) { tone(BUZZER_PIN, 1000, duracion); }`;
