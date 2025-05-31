# Personal AI Activity Planning Assistant

A smart AI assistant that helps you find activities and plan outings based on your preferences, dietary needs, schedule, and transportation options.

## ⚠️ AI Capability Requirements

This system requires an AI assistant with:
- **Web Search** - To find current events and venues
- **Calendar Integration** - To check availability and create events  
- **Email Integration** - To send invites (optional but recommended)
- **File/Knowledge Base Access** - To read YAML profile files
- **Current Date/Time Awareness** - For relevant recommendations
- **Location Services** - To suggest nearby activities

The assistant will inform you if any capabilities are missing and which features will be affected.

## Quick Start

1. **Upload the knowledge_base folder** to your AI assistant FIRST
2. **Then give your AI assistant the PROMPT.md** as its system instructions
3. **Start with:** "Hi, I'd like to set up my profile" or just ask "What should I do today?"
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

- **Smart Activity Recommendations**: Finds events and activities matching your interests
- **Calendar Integration**: Creates properly formatted events with all details
- **Group Coordination**: Plans activities considering everyone's preferences
- **Transit-Aware**: Suggests venues based on how you like to get around
- **Dietary Accommodations**: Always considers food restrictions and preferences
- **Multi-Activity Planning**: Chain together dinner, movie, drinks, etc.
- **Custom Interest Profiles**: Create your own beyond the defaults

## Basic Commands

- `"Set up my profile"` - Create your personal profile
- `"What should I do today?"` - Get activity recommendations
- `"I'm with [Name]"` - Plan activities for multiple people
- `"Plan dinner and a movie with [Name]"` - Multi-activity planning
- `"Show me updates"` - See what to add to your knowledge base
- `"My friend Sam likes..."` - Add new people naturally
- `"Create a CRAFT_BEER interest profile"` - Make custom interests

## Profile Management

### Simple Names
The system uses whatever name you provide:
- "Sam" → creates profile_personal_SAM.yaml
- "Sam Smith" → creates profile_personal_SAM_SMITH.yaml  
- Both work perfectly fine
- No last name required

### Handling Duplicates
If you know multiple people with the same first name:
```
You: "I'm meeting Alex"
Bot: "Which Alex - your coworker who's vegetarian, or your cousin who loves sushi?"
```

## How Profile Components Connect

### Profile Relationships:
1. **Settings → Personal Profile**: `DEFAULT_USER: ALEX` in profile_settings_DEFAULT_USER.yaml means when you say "I/me/my", the system looks for profile_personal_ALEX.yaml
2. **Relationship Mapping**: `"my partner": DAVID` means "my partner" refers to profile_personal_DAVID.yaml
3. **Personal → Interest Profiles**: `Active_Interest_Profiles: [FOODIE, ADVENTURER]` links to profile_interest_FOODIE.yaml and profile_interest_ADVENTURER.yaml
4. **Groups → Personal Profiles**: `Members: [ALEX, SARAH, MARCUS]` references profile_personal_ALEX.yaml, profile_personal_SARAH.yaml, etc.
5. **Combined Restrictions**: Groups inherit ALL dietary/accessibility needs from members

### How It Works in Practice:
```
You: "I'm with Sarah"
System:
1. Loads your profile (DEFAULT_USER)
2. Loads Sarah's profile
3. Combines all dietary restrictions
4. Finds overlapping interests
5. Applies most restrictive transportation/schedule constraints
6. Suggests activities that work for BOTH
```

## Example Conversations

### 🎯 First Time Setup
```
You: "Hi, I'd like to set up my profile"

Bot: "Great! Let's set up your profile. What should I call you?"

You: "I'm Alex"

Bot: "Nice to meet you, Alex! Tell me about your interests - what do you enjoy doing?"

You: "I love trying new restaurants, hiking on weekends, and going to art museums. I'm vegetarian and lactose intolerant. I usually take public transit or bike."

Bot: "Perfect! I've created your profile. Here's what to save:

📁 CREATE NEW FILE: profile_settings_DEFAULT_USER.yaml

```yaml
Default_User: ALEX
```

📁 CREATE NEW FILE: profile_personal_ALEX.yaml

```yaml
Profile_Name: "ALEX"
Full_Name: "Alex"
Active_Interest_Profiles: [FOODIE, ADVENTURER, CULTURE_ENTHUSIAST]

Dietary_Restrictions:
  Type: vegetarian
  Medical_Conditions: lactose intolerant

Transportation_Preferences:
  Preferred: "public transit, bike"
  
Notes: "Enjoys new restaurants, weekend hiking, art museums"
```

**🍽️ Quick Activity Request**
```
You: "I'm hungry but only have an hour"

Bot: "Here are quick lunch spots near you:

**Green Garden Café** - 10 min walk
- Great vegetarian options, dairy-free clearly marked
- Counter service, usually quick (30-45 min total)

**Noodle Express** - 5 min bike ride
- Vegetarian pho and rice noodles
- Fast service, perfect for your time limit"
```

**📅 Calendar Integration**
```
You: "Add the hike with Sam to my calendar"

Bot: "Here's the calendar event details:

📅 **Event**: Morning Hike with Sam
📍 **Location**: Eagle Trail Parking Lot, 123 Mountain Rd, Portland, OR 97210
⏰ **Time**: Saturday March 16, 9:00 AM - 11:30 AM

For Google Calendar/Outlook:
```yaml
title: "Morning Hike with Sam"
location: "Eagle Trail Parking Lot, 123 Mountain Rd, Portland, OR 97210"
start_time: "2024-03-16T09:00:00-07:00"
end_time: "2024-03-16T11:30:00-07:00"
description: |
  Trail: Eagle Loop (4 miles, moderate)
  Bring: Water, snacks, sunscreen
  Meeting: Sam at parking lot
  Notes: Sam is vegan - pack appropriate snacks
reminders: [60, 1440] # 1 hour and 1 day before
```

Or add manually with these details:
```
- Set reminder for 1 hour before
- Note: Bring water and vegan snacks for Sam"
```

**👥 Adding People Naturally**
```
You: "My coworker Jordan is vegan and really into yoga"

Bot: "I've created a profile for Jordan:

📁 CREATE NEW FILE: `profile_personal_JORDAN.yaml`
```yaml
Profile_Name: "JORDAN"
Full_Name: "Jordan"
Active_Interest_Profiles: [WELLNESS_SEEKER]

Dietary_Restrictions:
  Type: vegan

Notes: "Coworker, enjoys yoga"
Status: "basic profile - add contact info when available"

Would you like to add Jordan's email or other details?"
```

**🎫 Actionable Booking Help**
```
You: "I want to see the new Marvel movie with Pat"

Bot: "**Marvel Movie: Quantum Realm**
🎬 Playing at Downtown Cinema and Riverside 16

⏰ Showtimes this evening:
- Downtown: 7:00 PM, 9:45 PM
- Riverside: 6:45 PM, 7:30 PM, 9:30 PM

🎫 BOOK: Fandango.com or at theater
💰 $15 evening shows
🍿 Note: Pat loves popcorn but skip butter (dairy)

The 7:30 PM at Riverside works well - gives you time for dinner first. Should I help plan dinner too?"
```

**🚊 Smart Transit Routing**
```
You: "I'm meeting Jordan for yoga, I'll be biking"

Bot: "Great choice for biking! Here are yoga studios with good bike parking:

**Peaceful Flow Yoga**
🚴 Covered bike racks right outside
📍 423 Oak Street (15 min bike via River Path)
🧘 Next vegan-friendly class: 6:30 PM
💰 Drop-in: $20

The River Path is beautiful this time of day and connects directly to Oak Street."
```

**🎨 Custom Interest Profiles**
```
You: "I want to create a profile for craft beer enthusiasts"

Bot: "I'll help you create a custom interest profile:

📁 CREATE NEW FILE: `profile_interest_CRAFT_BEER_ENTHUSIAST.yaml`
```yaml
Profile_Type: "Interest"
Name: "CRAFT_BEER_ENTHUSIAST"
Description: "Enjoys craft breweries, beer tastings, and brew culture"

Interests:
  - Brewery tours and tastings
  - New brewery openings
  - Beer festivals
  - Brew-and-food pairings
  - Homebrewing events
  - Tap takeovers

Preferred_Venues:
  - Local microbreweries
  - Craft beer bars
  - Brewpubs with food
  - Beer gardens

Budget: "Moderate ($20-60)"
Typical_Duration: "2-3 hours"
Social_Style: "Good for groups or dates"


Now you can assign this to people who love craft beer!"
```

**🔄 Session Updates**
```
You: "Show me updates"

Bot: "Here's everything from our conversation:

📊 SESSION SUMMARY
━━━━━━━━━━━━━━━━━━

NEW PROFILES: 2
1️⃣ `profile_personal_JORDAN.yaml` - vegan coworker who does yoga
2️⃣ `profile_personal_PAT.yaml` - movie buddy, lactose issues

CUSTOM INTERESTS: 1
1️⃣ `profile_interest_CRAFT_BEER_ENTHUSIAST.yaml`

UPDATES: 1
1️⃣ `profile_personal_SAM.yaml` - added hiking preferences

ACTION ITEMS:
□ Book movie tickets for 7:30 PM showing
□ Get Jordan's email for yoga class invites
□ Add craft beer interest to Marcus's profile

Need me to show any of these files again?"
```

## How It Works

The system uses YAML files to store:
- **Personal Profiles**: Your preferences and those of your friends (using simple names)
- **Interest Profiles**: Types of activities (default set + your custom ones)
- **Group Profiles**: Common configurations of people you hang out with
- **Settings**: Your default identity and relationship mappings

### File Structure (Flat Directory):
```
knowledge_base/
├── profile_settings_DEFAULT_USER.yaml (identifies who "I/me" refers to)
├── profile_settings_DEFAULT_USER_TEMPLATE.yaml (template for new users)
├── profile_personal_[NAME].yaml (individual profiles like profile_personal_ALEX.yaml)
├── profile_group_[GROUP_NAME].yaml (predefined groups like profile_group_BOOK_CLUB.yaml)
└── profile_interest_[INTEREST_TYPE].yaml (FOODIE, ADVENTURER, etc.)
```

## Calendar Integration Details

The assistant provides calendar events in standard formats:
- **ISO 8601 timestamps** for accurate timezone handling
- **Complete location addresses** for map integration
- **Structured descriptions** with all relevant details
- **Attendee emails** when available
- **Reminder settings** (typically 1 hour and 1 day before)

## Tips for Best Results

1. **Use natural language**: "I hate loud places" not "Environment_Avoids: loud"
2. **Start simple**: Just a name and one fact is enough to begin
3. **Build over time**: Add details as you learn them
4. **Save your updates**: Always keep your knowledge base current
5. **Create custom profiles**: Make interest profiles for your specific hobbies

## Privacy & Data

- All profile data stays in your personal knowledge base
- The assistant only knows what you tell it
- You control all information and can edit files directly
- Use .gitignore to keep personal profiles out of version control

## Troubleshooting

**Bot needs clarification on names?**
- It's being helpful - you might know multiple Alexes
- Add a detail: "Alex from work" or "Alex who likes hiking"

**Calendar events not working?**
- Check if bot has calendar access
- Use the manual format provided as backup
- Ensure timezone is correct in timestamps

**Recommendations too generic?**
- Add more interests to profiles
- Create custom interest profiles for niche hobbies
- Mention specific preferences when asking

## Advanced Features

### Multi-Day Planning
> **You:** "Plan a weekend trip with Sam"  
> **Bot:** Creates interconnected calendar events with travel time, meal stops, and activities

### Smart Booking Reminders
> **Bot:** "⚠️ Hamilton tickets go on sale tomorrow at 10 AM - want me to remind you?"

### Weather-Aware Alternatives
> **Bot:** "Rain forecast for your hike. Indoor alternatives: climbing gym or the new nature exhibit at the Science Museum"

## Contributing

Feel free to submit issues or pull requests to improve the system!

## License

MIT License - Feel free to adapt this system for your needs