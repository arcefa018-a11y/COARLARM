--- src/App.tsx (原始)
import { useState, useEffect } from 'react';
import AlarmDashboard from './components/AlarmDashboard';
import CodeViewer from './components/CodeViewer';
import ConnectionPanel from './components/ConnectionPanel';
import SchematicInfo from './components/SchematicInfo';
import CompleteGuide from './components/CompleteGuide';
import AppInventorGuide from './components/AppInventorGuide';

type Tab = 'dashboard' | 'code' | 'schematic' | 'guide' | 'appinventor';

export interface Alarm {
  id: number;
  name: string;
  hour: number;
  minute: number;
  enabled: boolean;
  icon: string;
  color: string;
}

const DEFAULT_ALARMS: Alarm[] = [
  { id: 1, name: 'Inicio de Clases', hour: 7, minute: 0, enabled: true, icon: '📚', color: '#3b82f6' },
  { id: 2, name: 'Inicio Break 1', hour: 9, minute: 0, enabled: true, icon: '☕', color: '#8b5cf6' },
  { id: 3, name: 'Fin Break 1', hour: 9, minute: 20, enabled: true, icon: '🔔', color: '#8b5cf6' },
  { id: 4, name: 'Inicio Almuerzo', hour: 12, minute: 0, enabled: true, icon: '🍽️', color: '#f59e0b' },
  { id: 5, name: 'Fin Almuerzo', hour: 13, minute: 0, enabled: true, icon: '🔔', color: '#f59e0b' },
  { id: 6, name: 'Inicio Break 2', hour: 15, minute: 0, enabled: true, icon: '☕', color: '#10b981' },
  { id: 7, name: 'Fin Break 2', hour: 15, minute: 20, enabled: true, icon: '🔔', color: '#10b981' },
  { id: 8, name: 'Inicio Cena', hour: 18, minute: 0, enabled: true, icon: '🍲', color: '#ef4444' },
  { id: 9, name: 'Fin Cena', hour: 19, minute: 0, enabled: true, icon: '🔔', color: '#ef4444' },
  { id: 10, name: 'Alarma Dormir 1', hour: 20, minute: 30, enabled: true, icon: '🌙', color: '#6366f1' },
  { id: 11, name: 'Alarma Dormir 2', hour: 21, minute: 0, enabled: true, icon: '😴', color: '#6366f1' },
  { id: 12, name: 'Alarma Dormir 3', hour: 21, minute: 30, enabled: true, icon: '💤', color: '#6366f1' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [alarms, setAlarms] = useState<Alarm[]>(DEFAULT_ALARMS);
  const [esp32IP, setEsp32IP] = useState('192.168.1.100');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected' | 'connecting'>('disconnected');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const updateAlarm = (id: number, field: keyof Alarm, value: any) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const sendToESP32 = async () => {
    setConnectionStatus('connecting');
    try {
      const payload = {
        alarms: alarms.map(a => ({
          id: a.id,
          hour: a.hour,
          minute: a.minute,
          enabled: a.enabled
        }))
      };

      const response = await fetch(`http://${esp32IP}/setAlarms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });

      setConnectionStatus('connected');
      setTimeout(() => setConnectionStatus('connected'), 2000);
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                ⏰
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ESP32 Alarm System
                </h1>
                <p className="text-xs text-slate-400">Control de Alarmas Escolar Automatizado</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-2xl font-mono font-bold text-blue-400">
                  {currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-xs text-slate-400">
                  {currentTime.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                'bg-red-500'
              }`} title={`ESP32: ${connectionStatus}`} />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex gap-1 bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
          {[
            { id: 'dashboard' as Tab, label: 'Dashboard', icon: '📊' },
            { id: 'code' as Tab, label: 'Código ESP32', icon: '💻' },
            { id: 'schematic' as Tab, label: 'Conexiones', icon: '🔌' },
            { id: 'appinventor' as Tab, label: 'App Inventor', icon: '📱' },
            { id: 'guide' as Tab, label: 'Guía Completa', icon: '📖' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <ConnectionPanel
              esp32IP={esp32IP}
              setEsp32IP={setEsp32IP}
              connectionStatus={connectionStatus}
              onSend={sendToESP32}
            />
            <AlarmDashboard
              alarms={alarms}
              updateAlarm={updateAlarm}
              setAlarms={setAlarms}
              onSend={sendToESP32}
            />
          </div>
        )}
        {activeTab === 'code' && <CodeViewer />}
        {activeTab === 'schematic' && <SchematicInfo />}
        {activeTab === 'appinventor' && <AppInventorGuide />}
        {activeTab === 'guide' && <CompleteGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          <p>Sistema de Alarmas ESP32 • Desarrollado para automatización escolar</p>
          <p className="mt-1">LCD I2C + Teclado Matricial 4x4 + Buzzer + NTP Sync</p>
        </div>
      </footer>
    </div>
  );
}

export default App;


+++ src/App.tsx (修改后)
import { useState, useEffect } from 'react';
import AlarmDashboard from './components/AlarmDashboard';
import CodeViewer from './components/CodeViewer';
import ConnectionPanel from './components/ConnectionPanel';
import SchematicInfo from './components/SchematicInfo';
import CompleteGuide from './components/CompleteGuide';
import AppInventorGuide from './components/AppInventorGuide';
import ImplementacionCompleta from './components/ImplementacionCompleta';

type Tab = 'dashboard' | 'code' | 'schematic' | 'guide' | 'appinventor' | 'implementacion';

export interface Alarm {
  id: number;
  name: string;
  hour: number;
  minute: number;
  enabled: boolean;
  icon: string;
  color: string;
}

const DEFAULT_ALARMS: Alarm[] = [
  { id: 1, name: 'Inicio de Clases', hour: 7, minute: 0, enabled: true, icon: '📚', color: '#3b82f6' },
  { id: 2, name: 'Inicio Break 1', hour: 9, minute: 0, enabled: true, icon: '☕', color: '#8b5cf6' },
  { id: 3, name: 'Fin Break 1', hour: 9, minute: 20, enabled: true, icon: '🔔', color: '#8b5cf6' },
  { id: 4, name: 'Inicio Almuerzo', hour: 12, minute: 0, enabled: true, icon: '🍽️', color: '#f59e0b' },
  { id: 5, name: 'Fin Almuerzo', hour: 13, minute: 0, enabled: true, icon: '🔔', color: '#f59e0b' },
  { id: 6, name: 'Inicio Break 2', hour: 15, minute: 0, enabled: true, icon: '☕', color: '#10b981' },
  { id: 7, name: 'Fin Break 2', hour: 15, minute: 20, enabled: true, icon: '🔔', color: '#10b981' },
  { id: 8, name: 'Inicio Cena', hour: 18, minute: 0, enabled: true, icon: '🍲', color: '#ef4444' },
  { id: 9, name: 'Fin Cena', hour: 19, minute: 0, enabled: true, icon: '🔔', color: '#ef4444' },
  { id: 10, name: 'Alarma Dormir 1', hour: 20, minute: 30, enabled: true, icon: '🌙', color: '#6366f1' },
  { id: 11, name: 'Alarma Dormir 2', hour: 21, minute: 0, enabled: true, icon: '😴', color: '#6366f1' },
  { id: 12, name: 'Alarma Dormir 3', hour: 21, minute: 30, enabled: true, icon: '💤', color: '#6366f1' },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [alarms, setAlarms] = useState<Alarm[]>(DEFAULT_ALARMS);
  const [esp32IP, setEsp32IP] = useState('192.168.1.100');
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connected' | 'connecting'>('disconnected');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const updateAlarm = (id: number, field: keyof Alarm, value: any) => {
    setAlarms(prev => prev.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const sendToESP32 = async () => {
    setConnectionStatus('connecting');
    try {
      const payload = {
        alarms: alarms.map(a => ({
          id: a.id,
          hour: a.hour,
          minute: a.minute,
          enabled: a.enabled
        }))
      };

      const response = await fetch(`http://${esp32IP}/setAlarms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });

      setConnectionStatus('connected');
      setTimeout(() => setConnectionStatus('connected'), 2000);
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                ⏰
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ESP32 Alarm System
                </h1>
                <p className="text-xs text-slate-400">Control de Alarmas Escolar Automatizado</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-2xl font-mono font-bold text-blue-400">
                  {currentTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </div>
                <div className="text-xs text-slate-400">
                  {currentTime.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
              </div>
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' :
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                'bg-red-500'
              }`} title={`ESP32: ${connectionStatus}`} />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex gap-1 bg-slate-800/50 rounded-xl p-1 border border-slate-700/50 overflow-x-auto">
          {[
            { id: 'dashboard' as Tab, label: 'Dashboard', icon: '📊' },
            { id: 'code' as Tab, label: 'Código', icon: '💻' },
            { id: 'schematic' as Tab, label: 'Conexiones', icon: '🔌' },
            { id: 'implementacion' as Tab, label: 'Implementación', icon: '📋' },
            { id: 'appinventor' as Tab, label: 'App', icon: '📱' },
            { id: 'guide' as Tab, label: 'Publicar', icon: '🌐' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <ConnectionPanel
              esp32IP={esp32IP}
              setEsp32IP={setEsp32IP}
              connectionStatus={connectionStatus}
              onSend={sendToESP32}
            />
            <AlarmDashboard
              alarms={alarms}
              updateAlarm={updateAlarm}
              setAlarms={setAlarms}
              onSend={sendToESP32}
            />
          </div>
        )}
        {activeTab === 'code' && <CodeViewer />}
        {activeTab === 'schematic' && <SchematicInfo />}
        {activeTab === 'implementacion' && <ImplementacionCompleta />}
        {activeTab === 'appinventor' && <AppInventorGuide />}
        {activeTab === 'guide' && <CompleteGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-slate-500 text-sm">
          <p>Sistema de Alarmas ESP32 • Desarrollado para automatización escolar</p>
          <p className="mt-1">LCD I2C + Teclado Matricial 4x4 + Buzzer + NTP Sync</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
