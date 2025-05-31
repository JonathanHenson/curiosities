# AI Activity Assistant - Quick Reference Cheat Sheet

## 🚀 Quick Commands

| What You Want | What to Say |
|--------------|-------------|
| Initial setup | "Set up my profile" |
| Get recommendations | "What should I do today?" |
| Plan with someone | "I'm with Sarah" or "Plan something with Marcus" |
| Multi-activity | "Dinner and a movie with David" |
| Add new person | "My friend Lisa loves yoga and is vegan" |
| Update info | "Actually, Marcus doesn't drink anymore" |
| See all changes | "Show me updates" |
| Check capabilities | "What tools do you have access to?" |

## 📁 File Structure

```
knowledge_base/profiles/
├── settings/
│   └── DEFAULT_USER.yaml          # Your identity & relationships
├── personal/
│   └── FIRSTNAME_LASTNAME.yaml    # Individual profiles
├── groups/
│   └── GROUP_NAME.yaml           # Predefined groups
└── interests/
    └── INTEREST_TYPE.yaml        # Activity categories
```

## 🏷️ Interest Profile Types

- **FOODIE** - Restaurants, food festivals, culinary experiences
- **CULTURE_ENTHUSIAST** - Museums, theater, galleries, concerts
- **ADVENTURER** - Hiking, climbing, outdoor activities
- **SOCIAL_BUTTERFLY** - Nightlife, comedy, trivia, group events
- **WELLNESS_SEEKER** - Yoga, meditation, spa, mindfulness
- **BUDGET_EXPLORER** - Free events, community activities

## 👤 Personal Profile Fields

### Required Information
- **Name**: Full name and nicknames
- **Interests**: Which profiles apply (FOODIE, ADVENTURER, etc.)
- **Dietary**: Type (vegan/vegetarian/omnivore) + restrictions

### Optional but Helpful
- **Contact**: Email & phone for invites
- **Transit**: Preferred transport methods
- **Avoids**: Environments or situations to skip
- **Schedule**: When typically available

## 🔄 Natural Language Mappings

The bot understands variations:
- "I/me/my" → Your profile
- "Jon" → Finds "Jonathan"
- "My partner" → Checks your relationships
- "The Wilsons" → Finds couple profiles

## 💡 Profile Building Examples

### Quick Add
```
"My coworker Raj is vegetarian and loves hiking"
→ Creates RAJ profile with ADVENTURER interest
```

### Detailed Add
```
"I have a friend named Maya. She's vegan, bikes everywhere, 
hates loud music, and loves trying new restaurants"
→ Creates complete MAYA profile with all preferences
```

### Update Existing
```
"Preston's email is preston.t@gmail.com and he 
just got an e-bike"
→ Updates PRESTON's contact and transportation
```

## 🎯 Activity Planning Tips

### Time Shortcuts
- "Quick lunch" = 45-60 min activities
- "Make a day of it" = Full day planning
- "I have 2 hours" = Only shows activities that fit

### Group Planning
- "I'm with Sarah and Marcus" = Combines all dietary needs
- "My book club" = Uses predefined group
- "Family outing" = Suggests kid-friendly options

### Transit-Aware
- Mentions "Preston prefers trains" → Prioritizes transit-accessible
- "I don't want to drive" → Shows walkable/transit options
- "We're biking" → Suggests bike-friendly venues

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| "I don't know who that is" | Add them: "My friend X likes..." |
| Generic recommendations | Add more preferences to profiles |
| Missing calendar invites | Bot needs calendar access |
| No email sending | Bot will give you templates to copy |

## 📝 Update Management

After making changes, say "Show me updates" to get:
1. Complete files to copy/paste
2. Clear instructions on where to save
3. Comments showing what changed

## ⚡ Power User Tips

1. **Build incrementally** - Don't need everything at once
2. **Use relationships** - "My mom" instead of full names
3. **Mention constraints** - "But only 1 hour" or "Under $20"
4. **Chain activities** - "Hike then lunch then coffee"
5. **Weather aware** - "If it's nice out" for conditional plans

## 🔐 Privacy Notes

- All data stays in your local files
- Bot only knows what you tell it
- You can edit YAML files directly
- Use .gitignore for personal data