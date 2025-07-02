# Tradicia Intelligence

Современное веб-приложение, построенное на Next.js 15, TypeScript, Tailwind CSS и Supabase.

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18.0 или выше
- npm или yarn
- Аккаунт Supabase
- Аккаунт Vercel (для деплоя)

### Установка и запуск

1. **Установите зависимости:**
   ```bash
   npm install
   ```

2. **Настройте переменные окружения:**
   - Скопируйте `.env.local.example` в `.env.local`
   - Заполните переменные вашими значениями из Supabase

3. **Запустите в режиме разработки:**
   ```bash
   npm run dev
   ```

4. **Откройте в браузере:**
   ```
   http://localhost:3000
   ```

## 🛠 Технологический стек

- **Frontend:** Next.js 15, React 18, TypeScript
- **Стили:** Tailwind CSS  
- **База данных:** Supabase
- **Деплой:** Vercel
- **Линтинг:** ESLint

## 📁 Структура проекта

```
src/
├── app/              # Next.js App Router
│   ├── layout.tsx    # Основной layout
│   ├── page.tsx      # Главная страница
│   └── globals.css   # Глобальные стили
├── components/       # React компоненты
├── lib/             # Утилиты и конфигурации
│   └── supabase.ts  # Конфигурация Supabase
└── types/           # TypeScript типы
    └── index.ts     # Общие типы
```

## 🔧 Доступные команды

```bash
npm run dev          # Запуск в режиме разработки
npm run build        # Сборка для продакшена
npm run start        # Запуск продакшен сервера
npm run lint         # Запуск ESLint
```

## 🌐 Деплой на Vercel

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения в Vercel Dashboard
3. Деплой произойдет автоматически при пуше в main ветку

## 📝 Настройка Supabase

1. Создайте новый проект в [Supabase](https://supabase.com)
2. Получите URL проекта и анонимный ключ
3. Добавьте их в `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

## 🔗 Полезные ссылки

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Platform](https://vercel.com) 