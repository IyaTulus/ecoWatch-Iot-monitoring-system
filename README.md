# ecoWatch - Alert-Driven IoT Dashboard

![ecoWatch Banner](https://img.shields.io/badge/ecoWatch-Alert--Driven%20IoT-emerald?style=for-the-badge&logo=shield)
![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js)
![PrimeVue](https://img.shields.io/badge/PrimeVue-4.5-41B883?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript)

## 🌟 Overview

**ecoWatch** adalah sistem monitoring lingkungan real-time berbasis IoT yang dirancang dengan pendekatan **Alert-Driven Architecture**. Sistem ini menyediakan deteksi anomali otomatis, notifikasi kontekstual, dan pemantauan kesehatan perangkat untuk area hutan kota.

### 🎯 3 Fokus Utama Sistem

#### 1. 🔔 Smart Alerts

- **Deteksi Anomali Otomatis** dengan threshold dinamis
- **Duration Tracking** untuk mencegah false positive
- **Alert Deduplication** untuk menghindari spam notifikasi
- **Severity Classification**: INFO, WARNING, CRITICAL

#### 2. 💬 Contextual Notifications

- **Informasi Lokasi** perangkat yang mengalami anomali
- **Nilai Current vs Threshold** untuk konteks yang jelas
- **Rekomendasi Tindakan** yang actionable
- **Human-readable Duration** untuk memahami durasi masalah

#### 3. 💚 Device Health Monitoring

- **Status Online/Offline** dengan real-time tracking
- **Battery Monitoring** dengan warning otomatis
- **Last-Seen Timestamp** untuk deteksi perangkat mati
- **Health Severity**: HEALTHY, WARNING, CRITICAL

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.19.0
- npm atau yarn

### Installation

```bash
# Clone repository
git clone <repository-url>
cd ecowatch

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration

Buat file `.env` dari template:

```bash
cp .env.example .env
```

Default configuration (Dummy Data Mode):

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_DUMMY_DATA=true
VITE_ALERT_CHECK_INTERVAL=30000
VITE_DEVICE_HEALTH_CHECK_INTERVAL=60000
VITE_SENSOR_REFRESH_INTERVAL=10000
```

---

## 📊 Alert Rules

### Temperature

| Threshold | Severity | Duration | Action                |
| --------- | -------- | -------- | --------------------- |
| > 35°C    | CRITICAL | 5 min    | Check cooling systems |
| > 30°C    | WARNING  | 10 min   | Monitor trends        |
| < 15°C    | WARNING  | 10 min   | Check heating         |

### Humidity

| Threshold | Severity | Duration | Action                  |
| --------- | -------- | -------- | ----------------------- |
| < 30%     | WARNING  | 10 min   | Increase humidity       |
| > 85%     | WARNING  | 10 min   | Improve air circulation |

### Air Quality Index (AQI)

| Threshold | Severity | Duration  | Action               |
| --------- | -------- | --------- | -------------------- |
| > 150     | CRITICAL | Immediate | Check air filtration |
| > 100     | WARNING  | Immediate | Monitor air quality  |

### CO₂ Level

| Threshold  | Severity | Duration | Action              |
| ---------- | -------- | -------- | ------------------- |
| > 1500 ppm | CRITICAL | 5 min    | Improve ventilation |
| > 1000 ppm | WARNING  | 10 min   | Monitor CO₂ trends  |

---

## 🏗️ Architecture

### Feature-Based Structure

```
src/
├── features/
│   ├── alert/              # Alert System
│   │   ├── alert.rules.ts
│   │   ├── alert.engine.ts
│   │   ├── useAlert.ts
│   │   └── AlertPanel.vue
│   ├── notification/       # Notification System
│   │   ├── notification.mapper.ts
│   │   ├── notification.service.ts
│   │   └── useNotification.ts
│   ├── device/            # Device Health
│   │   ├── device.health.service.ts
│   │   ├── useDeviceHealth.ts
│   │   └── DeviceStatusCard.vue
│   └── dashboard/         # Dashboard
├── components/ui/         # Reusable Components
├── services/              # API Services
├── data/                  # Dummy Data
└── utils/                 # Utilities
```

### Environment-Based Configuration

**Development (Dummy Data):**

```env
VITE_USE_DUMMY_DATA=true
```

**Production (Real API):**

```env
VITE_API_BASE_URL=https://api.ecowatch.com/v1
VITE_USE_DUMMY_DATA=false
```

**No code changes required!** Services automatically switch based on environment variables.

---

## 🎨 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **UI Library**: PrimeVue 4.5
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **Map**: Leaflet
- **State Management**: Composables (Vue 3)

---

## 📱 Features

### ✅ Implemented

- [x] Alert engine with configurable rules
- [x] Duration-based alert evaluation
- [x] Alert deduplication
- [x] Contextual notifications
- [x] Device health monitoring
- [x] Real-time dashboard
- [x] Environment-based configuration
- [x] Dummy data mode for development
- [x] Dark mode support
- [x] Responsive design

### 🔄 Roadmap

- [ ] WebSocket integration for real-time updates
- [ ] Alert history and analytics
- [ ] User preferences and customization
- [ ] Multi-language support (ID/EN)
- [ ] Export reports (PDF/Excel)
- [ ] Mobile app (React Native)

---

## 🧪 Testing

### Manual Testing

1. **Start Development Server**

```bash
npm run dev
```

2. **Test Alert System**

- Modify `src/data/sensors.dummy.ts`
- Set temperature to 37°C
- Observe CRITICAL alert after 5 minutes

3. **Test Device Health**

- Check device health summary
- Verify WARNING/CRITICAL status for devices

4. **Test Notifications**

- Verify notification includes location, value, recommendation
- Test mark as read functionality

---

## 📦 Build for Production

```bash
# Build
npm run build

# Preview production build
npm run preview
```

Deploy the `dist/` folder to your hosting service.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

- **Developer**: [Your Name]
- **Institution**: Universitas [Your University]
- **Project**: Tugas Akhir - Kapita Selekta

---

## 📞 Support

For questions or support, please contact:

- Email: [your-email@example.com]
- GitHub Issues: [repository-url/issues]

---

**Built with ❤️ for environmental monitoring**
