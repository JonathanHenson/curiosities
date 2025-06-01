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

## 🔐 Mode Commands

| Mode | Command | What It Does |
|------|---------|--------------|
| **Identity Switch** | "Let Sarah use this" | Sarah can only edit her own profile |
| **Return Control** | "Switch back to me" | Returns to your profile |
| **Delegation** | "Marcus is planning for me" | Marcus plans with your preferences |
| **End Delegation** | "End delegation mode" | Back to normal |
| **Check Mode** | "Who am I right now?" | Shows current active user |
| **Locked Delegation** | Special setup required | Can't be exited (for sharing) |

## 📊 Operating Modes

### Normal Mode (Default)
- ✅ Full access to everything
- ✅ Can modify all profiles
- ✅ See all information

### Identity Switch Mode
- ✅ Update own profile only
- ✅ Add own contact info
- ❌ Can't see other profiles
- ❌ Can't access your data
- ⏱️ Auto-logout after 30 min

### Delegation Mode
- ✅ Plan on your behalf
- ✅ See permitted information
- ❓ Contact additions need permission
- 📧 You get override notifications

### Locked Delegation Mode
- 🔒 Cannot exit or switch
- 🔒 For shared chat sessions
- 🔒 All switching disabled
- ✅ Still has privacy protection

## 🎭 Permission Levels

| Symbol | Level | What They See |
|--------|-------|---------------|
| 🔓 | Basic | Public info only |
| 🔑 | Limited | Logistics without reasons |
| 🗝️ | Trusted | Selected personal context |
| 🔐 | Full | Everything (partner/spouse) |

## 📁 File Structure

```
knowledge_base/profiles/
├── settings/
│   └── DEFAULT_USER.yaml          # Your identity & permissions
├── personal/
│   └── FIRSTNAME_LASTNAME.yaml    # Individual profiles
├── groups/
│   └── GROUP_NAME.yaml           # Predefined groups
└── interests/
    └── INTEREST_TYPE.yaml        # Activity categories
```

## 🏷️ Three-Level Note System

1. **Private_Notes**: Never shared, but system uses for smart filtering
2. **Selective_Share_Notes**: Specific info for specific people
3. **Public_Notes**: Safe for anyone to see

Example:
```yaml
Private_Notes: |
  In recovery - 6 months sober
  
Selective_Share_Notes:
  MARCUS: |
    In recovery (so you know why no bars)
    
Public_Notes: |
  Loves hiking and trying new restaurants
```

## 👤 Setting Permissions

### Quick Templates

**Assistant/Professional:**
```yaml
Can_Know: [schedule, budget_ranges]
Can_Add_Contacts: true
Requires_Approval: true
```

**Close Friend:**
```yaml
Can_Know: [some_personal_context]
Can_Add_Contacts: false
Can_Suggest_Contacts: true
```

**Partner/Spouse:**
```yaml
Can_Know: [everything]
Can_Add_Contacts: true
Requires_Approval: false
```

## 🔄 Identity Switch Examples

### What Works
```
Sarah: "Add my phone number"
Bot: ✅ "What's your number?"

Sarah: "Update my dietary preferences"
Bot: ✅ "What should I update?"
```

### What Doesn't
```
Sarah: "Show me Alex's schedule"
Bot: ❌ "You can only access your own profile"

Sarah: "Add Marcus's email"
Bot: ❌ "You can only update your own info"
```

## 🤝 Delegation Examples

### Without Contact Permission
```
Friend: "Add my buddy Tom"
Bot: "I'll note Tom for Alex to add later"
```

### With Permission + Approval
```
Assistant: "Add vendor Lisa"
Bot: "I'll need Alex's approval. Sending request..."
```

### Full Permission
```
Partner: "Add my colleague"
Bot: ✅ "Adding them now. Any dietary restrictions?"
```

## 🔒 Setting Up Locked Delegation

### Fastest Method:
1. Start NEW chat
2. Paste this (edit names):
```
You are in LOCKED DELEGATION MODE.
- You help [ASSISTANT] plan for me, [YOUR_NAME]
- Identity switching is DISABLED
- Cannot exit this mode
- Email [YOUR_EMAIL] for overrides
Load profile: profile_personal_[YOUR_NAME].yaml
Start by greeting [ASSISTANT].
```
3. Share that chat link

## 💡 Privacy in Action

### Without Permission
**Them:** "Why avoid downtown?"
**Bot:** "Here are great northside options!" *(no reason given)*

### With Permission  
**Them:** "Why avoid downtown?"
**Bot:** "Alex prefers to avoid downtown for personal reasons"

### Full Context
**Them:** "Why avoid downtown?"
**Bot:** "Alex's ex works downtown, so we'll find other areas"

## 🚨 Sensitivity Warnings

Bot warns before sharing:
- HIGH: Medical, therapy, financial, relationships
- MEDIUM: Family, personal situations  
- LOW: Schedule conflicts, budget limits

Example:
```
⚠️ SENSITIVE INFO WARNING
Marcus asking about: Thursday schedule
Topic sensitivity: HIGH (therapy)
Marcus clearance: MEDIUM
Share this? [YES/NO]
```

## 📝 Update Tracking

```
"Show me updates" displays:

📊 SESSION SUMMARY
━━━━━━━━━━━━━━━━━━

MODE USED: Delegation (Dana)
NEW PROFILES: 1
CONTACTS SUGGESTED: 2
OVERRIDES: 1 (dietary)
SENSITIVE INFO ACCESSED: None

FILES TO UPDATE:
[Shows complete files]
```

## ⚡ Power User Tips

1. **Test permissions** - "What can Marcus see about me?"
2. **Audit access** - "Show me delegation log"
3. **Lock important** - Use locked mode for assistants
4. **Start simple** - Add permissions gradually
5. **Context helps** - Selective notes explain why
6. **Review logs** - Check session summaries

## 🔐 Security Checklist

- [ ] Set hard boundaries (medical, safety)
- [ ] Configure selective sharing
- [ ] Enable notifications
- [ ] Test with trusted friend
- [ ] Use locked mode for sharing
- [ ] Review logs regularly

## ❓ Common Issues

| Problem | Solution |
|---------|----------|
| "Can't switch identities" | You're in locked mode |
| "Can't see private info" | Check their permissions |
| "Can't add contacts" | Most can't in delegation |
| "Notifications not working" | Check email settings |
| "Wrong recommendations" | Update private notes |

## 🎯 Quick Wins

1. **Selective context** - Tell close friends why (recovery, health)
2. **Lock assistants** - They can't snoop with locked mode
3. **Audit trails** - Everything is logged
4. **Test first** - Try with partner before assistant
5. **Update regularly** - Permissions can change