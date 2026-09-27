# 🖼️ Favorite Photo (FE)

### What is your favorite? Find it on **Favorite Photo!**

![image](https://github.com/user-attachments/assets/c6df717d-058e-4e51-bf95-4188845eb6a7)

### [🖼️ Visit Favorite Photo](https://favorite-photo.vercel.app)

### [📋 Team Notion](https://www.notion.so/1-1e4b498dbd8180189b57e1cf348173b8?source=copy_link)

### [🔗 6-Favorite_Photo-BE](https://github.com/De-cal/6-Favorite_Photo-BE)

<br>

# 👨‍👩‍👧‍👦 **Team Members**

|                                                            |                                        |                                                                   |                                           |                                                                                         |                                     |                                        |
| :--------------------------------------------------------: | :------------------------------------: | :---------------------------------------------------------------: | :---------------------------------------: | :-------------------------------------------------------------------------------------: | :---------------------------------: | :------------------------------------: |
|                        Lee Tae-bin                         |              Kim Jae-wook              |                          Choi Min-kyung                           |                Kim Su-bin                 |                                        Lee Ji-su                                        |            **An Sebin**             |              Shin Su-min               |
|            [GitHub](https://github.com/De-cal)             | [GitHub](https://github.com/WooGie911) |               [GitHub](https://github.com/choi-mk)                | [GitHub](https://github.com/subinkim9755) |                          [GitHub](https://github.com/Jam1eL1)                           | [GitHub](https://github.com/sebiny) | [GitHub](https://github.com/Shinmilli) |
|                         Team Lead                          |            Deputy Team Lead            |                            Team Member                            |                Team Member                |                                       Team Member                                       |             Team Member             |              Team Member               |
| Profile<br>Header<br>Purchase<br>Exchange (Cancel Request) |        Notifications<br>Points         | Card Selling<br>Exchange (Accept/Reject)<br>Common Card Component | Loading Indicator<br>Photo Card Browsing  | Authentication/Authorization<br>Google OAuth<br>Landing Page<br>Common Button Component |             Marketplace             |              Cancel Sale               |

<br>

# 📑 **Project Overview**

> **Favorite Photo** is a platform where users can use points as virtual currency to **purchase** their favorite photo cards or **exchange** cards with other users.

Users can also enjoy a **Surprise Points** event that appears once every hour.

The platform allows users to exchange photo cards, showcase their personal collections, and interact with other users through a photo card marketplace.

<br>

# 📆 **Project Period**

### 2025.05.14 ~ 2025.06.04

<br>

# ⚙️ **Tech Stack**

| Category                 | Tech Stack                                                       |
| ------------------------ | ---------------------------------------------------------------- |
| **Frontend**             | JavaScript, Next.js, React, Tailwind CSS                         |
| **Backend**              | Node.js, Express, Nodemon, Prisma, PostgreSQL                    |
| **Libraries — Frontend** | React Query, Framer Motion, date-fns, crypto-js                  |
| **Libraries — Backend**  | Passport, Superstruct, bcrypt, express-jwt, jsonwebtoken, Multer |
| **Deployment**           | Vercel, Render                                                   |
| **Tools**                | Git, GitHub, Figma, Notion                                       |

<br>

# 🛠️ **Features Implemented by Each Team Member**

<details>
<summary><strong>Lee Tae-bin (Team Lead)</strong></summary>

- Header layout and profile modal UI
- Photo card purchasing
  - View card details
  - Users can purchase a card with points or propose an exchange if the card does not belong to them

- Photo card exchange
  - Send exchange requests
  - Cancel exchange requests

</details>

<details>
<summary><strong>Kim Jae-wook (Deputy Team Lead)</strong></summary>

- Notifications
  - Relative time display for notifications
  - Exchange completed / rejected notifications
  - Exchange proposal notifications
  - Purchase completion notifications
  - Sale completion notifications
  - Sold-out notifications

- Surprise Points
  - Users receive a random point reward once every hour through a surprise modal

</details>

<details>
<summary><strong>Choi Min-kyung</strong></summary>

- Photo card selling
  - List owned photo cards for sale
  - Edit sales information for cards listed by the user

- Photo card exchange
  - Accept or reject exchange proposals
  - View proposed exchange cards
  - Complete exchanges by transferring ownership between users

</details>

<details>
<summary><strong>Kim Su-bin</strong></summary>

- Success and failure modals
- My Photo Cards
  - View all photo cards purchased or owned by the user
  - Filtering, sorting, searching, and pagination

- My Selling Cards
  - View photo cards listed for sale
  - Filtering by grade, genre, sales method, and sold-out status
  - Pagination

</details>

<details>
<summary><strong>Lee Ji-su</strong></summary>

- Authentication & Authorization
  - User registration
  - Login
  - Logout
  - Role-based access to features

- Google OAuth
  - Sign up and log in using a Google account

- Landing Page
  - Displays an introduction to the service for logged-out users
  - Hidden from logged-in users

</details>

<details>
<summary><strong>An Sebin</strong></summary>

- **Photo Card Marketplace**
  - Browse all photo cards listed for sale
  - Search and filtering by grade, genre, description, sold-out status, etc.
  - Sorting by newest/oldest and lowest/highest price
  - Implemented **infinite scrolling**
  - Single-select filtering

</details>

<details>
<summary><strong>Shin Su-min</strong></summary>

- Photo card creation
  - Upload a personal photo and create a photo card
  - Enter or select information such as name, minimum price, grade, total issue quantity, genre, and description

- Photo card selling
  - View detailed information
  - View exchange card proposals for cards listed by the user
  - Cancel sales for cards listed by the user

</details>

<br>

# 🗂️ **Project Structure**

<details>
<summary><strong>Frontend</strong></summary>

```text
📦 /
┣ 📂src
┃ ┣ 📂app
┃ ┃ ┣ 📂(auth)
┃ ┃ ┃ ┣ 📂google-callback
┃ ┃ ┃ ┣ 📂login
┃ ┃ ┃ ┗ 📂signup
┃ ┃ ┣ 📂marketplace
┃ ┃ ┃ ┗ 📂[id]
┃ ┃ ┃   ┣ 📂buyer
┃ ┃ ┃   ┗ 📂seller
┃ ┃ ┣ 📂my-gallery
┃ ┃ ┃ ┗ 📂create
┃ ┃ ┣ 📂my-sell
┃ ┃ ┣ 📜globals.css
┃ ┃ ┣ 📜layout.js
┃ ┃ ┣ 📜loading.js
┃ ┃ ┣ 📜page.js
┃ ┃ ┗ 📜Providers.jsx
┃ ┣ 📂assets
┃ ┃ ┣ 📂fonts
┃ ┃ ┣ 📂icons
┃ ┃ ┗ 📂images
┃ ┣ 📂components
┃ ┃ ┣ 📂common
┃ ┃ ┣ 📂modal
┃ ┃ ┗ 📂ui
┃ ┣ 📂contexts
┃ ┣ 📂hooks
┃ ┣ 📂lib
┃ ┃ ┣ 📂api
┃ ┃ ┗ 📂utils
┃ ┗ 📂providers
┣ 📜.env
┣ 📜.env.example
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜eslint.config.mjs
┣ 📜jsconfig.json
┣ 📜next.config.mjs
┗ 📜README.md
```

</details>

<details>
<summary><strong>Backend</strong></summary>

```text
📦 /
┣ 📂src
┃ ┣ 📂config
┃ ┣ 📂controllers
┃ ┣ 📂db
┃ ┃ ┣ 📂generated
┃ ┃ ┗ 📂prisma
┃ ┃   ┣ 📂migrations
┃ ┃   ┣ 📂mocks
┃ ┃   ┣ 📜prisma.js
┃ ┃   ┣ 📜schema.prisma
┃ ┃   ┗ 📜seed.js
┃ ┣ 📂middlewares
┃ ┣ 📂repositories
┃ ┣ 📂routes
┃ ┣ 📂services
┃ ┣ 📂structs
┃ ┃ ┗ 📂auth
┃ ┣ 📂uploads
┃ ┣ 📂utils
┃ ┗ 📜app.js
┣ 📜.env
┣ 📜.env.example
┣ 📜.gitignore
┣ 📜.http
┣ 📜.prettierrc
┣ 📜package-lock.json
┣ 📜package.json
┗ 📜README.md
```

</details>
