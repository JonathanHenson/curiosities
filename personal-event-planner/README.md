# Personal AI Activity Planning Assistant

A smart AI assistant that helps you find activities and plan outings based on your preferences, dietary needs, schedule, and transportation options. Features privacy-preserving identity switching, secure delegation modes, and granular permission controls for safe multi-user planning.

## ⚠️ AI Capability Requirements

This system requires an AI assistant with:
- **Web Search** - To find current events and venues
- **Calendar Integration** - To check availability and create events  
- **Email Integration** - To send invites and override notifications (optional but recommended)
- **File/Knowledge Base Access** - To read YAML profile files
- **Current Date/Time Awareness** - For relevant recommendations
- **Location Services** - To suggest nearby activities

The assistant will inform you if any capabilities are missing and which features will be affected.

## 🔐 Privacy & Security Features

### Four Operating Modes

1. **Normal Mode** - Full access to your own profile and all features
2. **Identity Switch Mode** - Let others temporarily use the system (limited to their own profile)
3. **Delegation Mode** - Others plan on your behalf with permission controls
4. **Locked Delegation Mode** - Secure, non-switchable planning session for sharing

### Privacy Protection

- **Three-Level Note System**
  - Private Notes: Never shared, but system uses insights
  - Selective Share Notes: Specific info for specific people
  - Public Notes: Safe information for general sharing
  
- **Granular Permissions**
  - Different people see different levels of detail
  - Medical/allergy boundaries cannot be overridden
  - Soft preferences can be overridden with notification
  
- **Contact Management Controls**
  - Identity switch: Can only add/edit own contact info
  - Delegation: Restricted by individual permissions
  - Suggestions queue for unauthorized additions

## Quick Start

1. **Upload the knowledge_base folder** to your AI assistant FIRST
2. **Give your AI assistant the PROMPT.md** as its system instructions
3. **Start with:** "Hi, I'd like to set up my profile" or "What should I do today?"
4. The assistant will guide you through creating your personal profile
5. As you use it, ask "Show me updates" to get any new information to add to your knowledge base

### Updating Your Knowledge Base

For Claude Projects and similar systems where you can't edit files directly:
1. Ask the bot to "Show me updates" 
2. Copy the complete file contents shown
3. Update your local files with the new content
4. Re-upload the entire knowledge_base folder to your AI assistant
5. The updated information will be available in your next conversation

## Key Features

### Core Planning Features
- **Smart Activity Recommendations** - Finds events matching your interests
- **Calendar Integration** - Creates properly formatted events
- **Group Coordination** - Plans considering everyone's preferences
- **Transit-Aware** - Suggests venues based on transportation
- **Dietary Accommodations** - Always respects food restrictions
- **Multi-Activity Planning** - Chain together full day plans
- **Custom Interest Profiles** - Create your own categories

### Privacy & Multi-User Features
- **Identity Switching** - Others can temporarily access only their profile
- **Delegation Planning** - Others plan for you with safeguards
- **Locked Sessions** - Share secure planning sessions that can't be hijacked
- **Selective Sharing** - Grant specific people access to specific information
- **Privacy Protection** - Private notes influence planning without exposure
- **Override Notifications** - Get emailed when preferences are overridden
- **Hard Boundaries** - Set medical/personal limits that cannot be overridden
- **Session Logging** - Track all actions in delegation mode

## Basic Commands

### Planning Commands
- `"Set up my profile"` - Create your personal profile
- `"What should I do today?"` - Get activity recommendations
- `"I'm with [Name]"` - Plan activities for multiple people
- `"Plan dinner and a movie with [Name]"` - Multi-activity planning
- `"Show me updates"` - See what to add to your knowledge base
- `"My friend Sam likes..."` - Add new people naturally
- `"Create a CRAFT_BEER interest profile"` - Make custom interests

### Mode Switching Commands
- `"Switch to Sarah's identity"` - Let Sarah use the system (limited to her profile)
- `"Let Marcus use this"` - Hand control to Marcus
- `"Switch back to me"` - Return to your profile
- `"Who am I right now?"` - Check current identity
- `"You're helping Dana plan for me"` - Delegation mode
- `"End delegation mode"` - Return to normal

## Operating Modes Explained

### 🔄 Identity Switch Mode
Let someone temporarily use your system to update their own information:

**What They CAN Do:**
- ✅ Update their own profile
- ✅ Add/edit their own contact details
- ✅ Plan their own activities
- ✅ View their own preferences

**What They CAN'T Do:**
- ❌ See or modify other profiles
- ❌ Access your private information
- ❌ Change system settings
- ❌ View private notes about themselves

**Example:**
```
You: "Let Jamie update their info"
Bot: "Switching to Jamie's profile. Jamie, you can now update 
     your own information. Say 'switch back to Alex' when done.
     
🔄 Active Identity: JAMIE
⏱️ Auto-logout: 30 minutes"
```

### 🤝 Delegation Mode
Someone plans activities on your behalf with controlled access:

**Permission Levels:**
- 🔓 **Basic** - Public info only, no context
- 🔑 **Limited** - Specific logistics without reasons
- 🗝️ **Trusted** - Selected personal context
- 🔐 **Full** - Complete transparency (typically partners)

**Example:**
```
You: "My assistant Dana is planning my client dinners"
Bot: "Delegation mode activated.
     
🤝 Planning for: ALEX
Assistant: DANA
🔑 Access: Professional (schedules + budgets)
📧 Overrides notify: alex@email.com"
```

### 🔒 Locked Delegation Mode
A secure version for sharing planning sessions:

**Key Features:**
- Cannot be exited or switched
- Mode commands are disabled
- Perfect for sharing a chat link
- Maintains all privacy protections

**Setting Up:**
```
Start new chat and paste:
"You are now in LOCKED DELEGATION MODE.
- You are helping [NAME] plan for me, [YOUR_NAME]
- Identity switching is DISABLED
- Cannot exit this mode
- Email [YOUR_EMAIL] for overrides"
```

## Profile Management

### Profile Structure Overview
```yaml
# Three types of notes for privacy
Private_Notes: |     # Never shared, system uses for insights
  Sensitive personal information
  
Selective_Share_Notes:  # Different info for different people
  FRIEND_NAME: |
    Selected context they need to know
    
Public_Notes: |      # Generally safe to share
  Hobbies and interests

# Permission controls
Privacy_Settings:
  Can_View_When_Delegating: [what's visible]
  Selective_View_Permissions:
    FRIEND: [what they specifically can see]
  
Delegation_Permissions:
  Planner_Permissions:
    FRIEND:
      Can_Know: [what context they get]
      Can_Add_Contacts: false  # Usually no
      Special_Access: "Friend-level context"
```

### Selective Sharing Examples

**For Your Best Friend:**
```yaml
Selective_Share_Notes:
  MARCUS: |
    In recovery - 6 months sober (so you understand no bars)
    Dad in hospice (might need to cancel plans)
```
Result: Marcus understands context for better planning

**For Your Assistant:**
```yaml
Selective_Share_Notes:
  DANA: |
    Avoid downtown area for meetings
    Thursday 5pm always blocked
    Keep events under $100
```
Result: Dana can schedule effectively without personal details

**For Your Partner:**
```yaml
Selective_Share_Notes:
  PARTNER: |
    All private notes shared - full transparency
```
Result: Complete context for thoughtful planning

## Example Conversations

### 🎯 First Time Setup
```
You: "Set up my profile"
Bot: "Great! Let's set up your profile. What should I call you?"
You: "I'm Alex"
Bot: "Nice to meet you, Alex! Tell me about your interests and any dietary needs."
[Bot creates your profile with privacy controls]
```

### 🔐 Selective Permission in Action
```
# Your private note: "In recovery - 6 months sober"

Without Permission:
Marcus: "Let's hit that new brewery!"
Bot: "I found these great alternatives instead:
     - Arcade bar with mocktails
     - Coffee house with live music
     - Comedy club"
[No mention of why]

With Permission:
Marcus: "Let's hit that new brewery!"
Bot: "Since Alex is in recovery, how about these alcohol-free options:
     - Arcade bar with great mocktails
     - Coffee house with live music  
     - Comedy club"
[Context provided because Marcus has permission]
```

### 🚫 Contact Control Examples

**Identity Switch - Own Contact Only:**
```
Sarah (switched): "Add my phone number"
Bot: "✅ Updating your contact info. What's your number?"

Sarah: "Update Marcus's email"
Bot: "❌ You can only update your own information in identity switch mode."
```

**Delegation - Based on Permissions:**
```
Assistant: "Add vendor Lisa"
Bot: "📋 I'll need Alex's approval to add Lisa. What info should we include?
     📧 Approval request sent to alex@email.com"

Partner: "Add my colleague Rachel"  
Bot: "✅ Adding Rachel. Any dietary restrictions I should know about?"
```

### 🔒 Locked Session Security
```
Dana: "Switch to Alex's identity"
Bot: "🔒 This is a locked planning session. I can only help plan activities.
     What would you like to plan for Alex?"

Dana: "Show me their private notes"
Bot: "🔒 I can share dietary needs and interests for planning, but private 
     details remain protected. Alex is vegetarian and enjoys hiking."
```

## Privacy Protection Examples

### Location Avoidance
- **Private Note**: "Avoiding downtown - ex works there"
- **System Behavior**: Silently suggests only northside venues
- **User Sees**: Great recommendations (no mention of avoiding areas)

### Health Privacy
- **Private Note**: "In recovery"
- **System Behavior**: Never suggests bars/breweries
- **User Sees**: Coffee shops and restaurants (no explanation)

### Schedule Protection
- **Private Note**: "Therapy Thursdays 5pm"
- **Without Permission**: "Thursday evening is blocked"
- **With Permission**: "Alex has a recurring commitment then"
- **Full Permission**: "Alex has therapy at 5pm Thursdays"

## Setting Up Permissions

### Quick Permission Templates

**For Professional Assistant:**
```yaml
ASSISTANT_NAME:
  Can_Know: [schedule_blocks, budget_ranges]
  Can_Add_Contacts: true
  Contact_Addition_Requires_Approval: true
  Special_Access: "Professional - logistics only"
```

**For Close Friend:**
```yaml
FRIEND_NAME:
  Can_Know: [some_personal_context]
  Can_Add_Contacts: false
  Can_Suggest_Contacts: true
  Selective_Share_Notes: |
    Recovery status (for appropriate planning)
    Family situation basics
```

**For Partner/Spouse:**
```yaml
PARTNER_NAME:
  Can_Know: [everything]
  Can_Add_Contacts: true
  Contact_Addition_Requires_Approval: false
  Special_Access: "Full transparency"
```

## Security Best Practices

1. **Start Conservative** - Grant minimal permissions initially
2. **Use Selective Sharing** - Only share what helpers need to know
3. **Set Hard Boundaries** - Medical/safety limits that can't be overridden
4. **Enable Notifications** - Get alerts for overrides and changes
5. **Review Session Logs** - Check what was accessed and changed
6. **Test First** - Try features with trusted friends before real use
7. **Use Locked Mode** - When sharing chat sessions with others

## Tips for Best Results

1. **Natural Language** - "I hate loud places" not technical syntax
2. **Build Gradually** - Start simple, add details over time
3. **Update Regularly** - Keep profiles current as things change
4. **Create Custom Interests** - Make profiles for specific hobbies
5. **Set Boundaries Early** - Define limits before delegating
6. **Use Selective Sharing** - Give helpers appropriate context
7. **Lock Shared Sessions** - Prevent mode switching in shared chats

## File Structure

```
knowledge_base/
├── profile_settings_DEFAULT_USER.yaml (your identity & permissions)
├── profile_settings_DEFAULT_USER_TEMPLATE.yaml (template)
├── profile_personal_[NAME].yaml (individual profiles)
├── profile_group_[GROUP_NAME].yaml (predefined groups)
└── profile_interest_[INTEREST_TYPE].yaml (activity categories)
```

## Troubleshooting

**Bot needs clarification on names?**
- You might know multiple people with same name
- Add context: "Alex from work" or "Alex who hikes"

**Permission issues?**
- Check Planner_Permissions in your profile
- Verify Selective_Share_Notes for that person
- Test with "Who can see what about me?"

**Locked mode not working?**
- Ensure you started fresh chat
- Use exact locked mode prompt
- Don't include regular prompt instructions

**Contact additions failing?**
- Check delegation permissions
- Verify email notifications enabled
- Review Contact_Management settings

## Advanced Features

### Permission Testing
> "Show me what Marcus can see about me"  
> Bot shows exact information available to Marcus

### Audit Trail
> "Show me delegation log"  
> Bot displays all actions taken on your behalf

### Emergency Override
> Designated contacts can access medical info in emergencies

### Graduated Sharing
> Share more information as relationships deepen

## Contributing

Feel free to submit issues or pull requests to improve the system!

## License

MIT License - Feel free to adapt this system for your needs