# 🚀 Настройка проекта Tradicia Intelligence

## 📋 Что уже готово

✅ **Полностью настроенный Next.js проект** с TypeScript и Tailwind CSS  
✅ **Все компоненты сайта** согласно техническому заданию  
✅ **Темная тема** с фирменными цветами  
✅ **Адаптивный дизайн** для всех устройств  
✅ **Анимации и эффекты** (шершавое стекло, hover-эффекты, карусели)  
✅ **Готовность к деплою** на Vercel  

## 🛠 Следующие шаги для запуска

### 1. Локальный запуск (уже работает!)

Сайт уже запущен и доступен по адресу: **http://localhost:3000**

Команды для управления:
```bash
npm run dev     # Запуск в режиме разработки
npm run build   # Сборка для продакшена  
npm run start   # Запуск продакшен версии
npm run lint    # Проверка кода
```

### 2. Настройка Supabase (опционально)

1. Перейдите на [supabase.com](https://supabase.com) и создайте новый проект
2. В панели проекта найдите настройки API
3. Скопируйте **Project URL** и **anon public key**
4. Создайте файл `.env.local` и добавьте:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=ваш_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=ваш_anon_key
   ```

### 3. Деплой на Vercel + подключение домена

#### Подготовка к деплою:
1. Загрузите код в GitHub репозиторий
2. Перейдите на [vercel.com](https://vercel.com) и войдите через GitHub
3. Нажмите "Import Project" и выберите ваш репозиторий

#### Подключение домена tradicia-intelligence.ru:
1. В Vercel Dashboard откройте ваш проект
2. Перейдите в **Settings → Domains**
3. Добавьте домен: `tradicia-intelligence.ru`
4. Vercel покажет DNS записи, которые нужно настроить:
   ```
   Type: A     Name: @             Value: 76.76.19.61
   Type: CNAME Name: www           Value: cname.vercel-dns.com
   ```

#### Настройка DNS (у вашего регистратора домена):
1. Войдите в панель управления доменом tradicia-intelligence.ru
2. Найдите раздел "DNS записи" или "DNS управление"
3. Добавьте записи, указанные Vercel
4. Дождитесь распространения DNS (может занять до 24 часов)

#### Настройка переменных окружения в Vercel:
1. В проекте Vercel: **Settings → Environment Variables**
2. Добавьте переменные из `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL = ваш_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY = ваш_anon_key
   ```

### 4. SSL сертификат
Vercel автоматически настроит бесплатный SSL сертификат для вашего домена.

## 🎯 Управление контентом

### Секция "Анонс"
Чтобы показать секцию "Анонс":
1. Откройте `src/components/AnnouncementSection.tsx`
2. Измените `currentAnnouncement` с `null` на объект с данными:
   ```typescript
   const currentAnnouncement: Announcement | null = {
     id: '1',
     title: 'Название события',
     description: 'Описание события',
     poster: '/path-to-poster.jpg',
     date: 'Дата события'
   }
   ```

### Добавление событий
Отредактируйте массивы `events` и `pastEvents` в `src/components/EventsSection.tsx`

### Изменение проектов  
Отредактируйте массив `projects` в `src/components/ProjectsSection.tsx`

### Обновление контактов
Измените массив `contacts` в `src/components/ContactsSection.tsx`

## 🎨 Кастомизация

### Цвета
Все цвета настроены в `tailwind.config.js`:
- `tradicia-black`: #000000
- `tradicia-dark`: #1A1A1A  
- `tradicia-blue`: #0066FF
- `tradicia-white`: #FFFFFF

### Шрифты и стили
Глобальные стили в `src/app/globals.css`

## 📱 Функции сайта

✅ **Адаптивная навигация** с эффектом шершавого стекла  
✅ **Плавная прокрутка** между секциями  
✅ **Интерактивные карточки** с hover-эффектами  
✅ **Календарь событий** с разделением на прошедшие/предстоящие  
✅ **Автоматическая карусель проектов** (останавливается при наведении)  
✅ **Модальные окна** для детальной информации  
✅ **Условная секция "Анонс"** (показывается только при наличии контента)  

## 🔧 Техническая информация

- **Framework**: Next.js 15 (App Router)
- **Язык**: TypeScript
- **Стили**: Tailwind CSS 4.x
- **База данных**: Supabase (настроена, готова к использованию)
- **Деплой**: Vercel
- **Домен**: tradicia-intelligence.ru (готов к подключению)

## 🎉 Готово к использованию!

Сайт полностью функционален и готов к продакшену. Все анимации, эффекты и интерактивные элементы работают согласно техническому заданию. 