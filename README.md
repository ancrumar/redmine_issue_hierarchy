# 🌳 Redmine Issue Hierarchy

Advanced hierarchical issue tree for Redmine with recursive expand/collapse, progress KPIs, persistent state and improved issue navigation.

---

## ✨ Features

### 🌲 Hierarchical Navigation

- Recursive expand / collapse
- Expand all / collapse all
- Parent grouping
- Native Redmine hierarchy support
- Direct integration into `/issues`

### 📊 Smart KPIs

- Progress KPI aggregation
- Recursive descendant calculations
- Child issue counters
- Automatic closed branch detection

### 🧠 Persistent State

- Persistent collapsed state using localStorage
- Auto-collapse fully closed branches
- Restore expanded/collapsed state after refresh

### ⚡ Lightweight Architecture

- No Redmine core modifications
- Frontend-first architecture
- Upgrade-safe
- Lightweight and fast
- No database migrations

---

# 📸 Screenshots

## Hierarchical Issue Tree

- Expand / collapse issue branches
- Progress KPIs
- Recursive hierarchy support
- Native Redmine tree integration

## Toolbar Actions

- Group by parent
- Expand all
- Collapse all
- Hide closed issues

---

# ✅ Compatibility

Tested with:

- Redmine 5.x
- Redmine 6.x

---

# 🚀 Installation

Copy plugin into:

```text
plugins/redmine_issue_hierarchy
```

Restart Redmine:

```bash
docker restart redmine
```

Or:

```bash
bundle exec rails server
```

---

# 🏗️ Architecture

This plugin is fully frontend-based and does not modify the Redmine core.

## Main Components

```text
redmine_issue_hierarchy/
├── assets/
│   ├── javascripts/
│   │   └── issue_tree.js
│   └── stylesheets/
│       └── issue_tree.css
├── lib/
│   └── redmine_issue_tree/
│       └── hooks.rb
├── init.rb
└── README.md
```

---

# 🔥 Current Features

## 🌲 Hierarchical Tree

- Detects native Redmine hierarchy using `idnt-*`
- Recursive descendant detection
- Direct child counting
- Branch-level collapse management

## 🔽 Expand / Collapse

- Per-branch expand/collapse
- Recursive collapsing
- Expand all / collapse all buttons
- State restoration after refresh

## 💾 Persistent State

Collapsed branches remain collapsed after refresh using browser localStorage.

## 📈 Progress KPIs

Displays aggregated progress percentages for descendant issues.

### Example

```text
▼ (12) [73%]
```

## ✅ Closed Issue Management

- Hide closed issues
- Auto-collapse fully closed branches

---

# 🎯 Philosophy

The plugin intentionally avoids:

- Core Redmine patches
- Database migrations
- Heavy Rails overrides
- Complex backend logic

This keeps upgrades safer, simpler and more maintainable.

---

# 🛣️ Roadmap

Planned future improvements:

- SVG / FontAwesome icons
- Smooth animations
- Drag & drop hierarchy
- Per-user persistent state (backend)
- Lazy loading for large trees
- Advanced KPI weighting
- Mobile optimization

---

# 📦 License

MIT License

---

# 👨‍💻 Author

**Angel Cruz**

GitHub:

https://github.com/ancrumar

---

# ⭐ Repository

If you find this plugin useful, consider starring the repository ⭐

https://github.com/ancrumar/redmine_issue_hierarchy
