# Временная публикация на GitHub Pages

Проект собирается в статическую папку `out` и автоматически публикуется из ветки `main`.

## Первая публикация

1. Создайте пустой репозиторий на GitHub с любым именем, например `eglship`.
2. В папке проекта выполните:

   ```powershell
   git init
   git add .
   git commit -m "Initial EGLSHIP landing"
   git branch -M main
   git remote add origin https://github.com/USERNAME/REPOSITORY.git
   git push -u origin main
   ```

3. В репозитории откройте **Settings → Pages**.
4. В **Build and deployment → Source** выберите **GitHub Actions**.
5. Откройте вкладку **Actions** и дождитесь завершения `Deploy to GitHub Pages`.

Для обычного репозитория сайт откроется по адресу:

```text
https://USERNAME.github.io/REPOSITORY/
```

Workflow автоматически определяет имя репозитория и добавляет нужный префикс к статическим файлам. Локальная команда `npm run dev` продолжает работать на обычном адресе без префикса.

## SEO и собственный домен

Для временного адреса GitHub Pages canonical, Open Graph, `robots.txt` и `sitemap.xml` формируются автоматически. После подключения основного домена добавьте в **Settings → Secrets and variables → Actions → Variables**:

- `SITE_URL` — полный адрес сайта без завершающего слеша, например `https://eglship.com`;
- `GOOGLE_SITE_VERIFICATION` — токен Google Search Console, если он уже получен;
- `YANDEX_SITE_VERIFICATION` — токен Яндекс Вебмастера, если он уже получен.

После изменения переменных повторно запустите workflow `Deploy to GitHub Pages`.

## Локальная проверка Pages-сборки

Для репозитория `eglship`:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/eglship"
$env:NEXT_PUBLIC_SITE_URL = "https://USERNAME.github.io/eglship"
npm run build
Remove-Item Env:NEXT_PUBLIC_BASE_PATH
Remove-Item Env:NEXT_PUBLIC_SITE_URL
```

Готовые файлы появятся в папке `out`.

## Как убрать временную поддержку Pages

Удалите:

- `.github/workflows/deploy-pages.yml`;
- `scripts/prepare-github-pages.mjs`;
- `public/.nojekyll`;
- `GITHUB_PAGES.md`.

Верните `next.config.ts` и команду `build` в `package.json` к обычным настройкам без `basePath` и скрипта подготовки.
