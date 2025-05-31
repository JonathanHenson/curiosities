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

1. **Give your AI assistant the PROMPT.md file** as its system instructions
2. **Upload the knowledge_base folder** to your AI assistant
3. **Start with:** "Hi, I'd like to set up my profile" or just ask "What should I do today?"
4. The assistant will guide you through creating your personal profile
5. As you use it, ask "Show me updates" to get any new information to add to your knowledge base

## Key Features

- **Smart Activity Recommendations**: Finds events and activities matching your interests
- **Calendar Integration**: Checks for conflicts and helps schedule events
- **Group Coordination**: Plans activities considering everyone's preferences
- **Transit-Aware**: Suggests venues based on how you like to get around
- **Dietary Accommodations**: Always considers food restrictions and preferences
- **Multi-Activity Planning**: Chain together dinner, movie, drinks, etc.

## Basic Commands

- `"Set up my profile"` - Create your personal profile
- `"What should I do today?"` - Get activity recommendations
- `"I'm with [Name]"` - Plan activities for multiple people
- `"Plan dinner and a movie with [Name]"` - Multi-activity planning
- `"Show me updates"` - See what to add to your knowledge base
- `"Add [Name] to my contacts"` - Build your social network

## Example Conversations

### 🎯 First Time Setup
```
You: "Hi, I'd like to set up my profile"

Bot: "Great! Let's set up your profile. What should I call you?"

You: "I'm Alex"

Bot: "Nice to meet you, Alex! Tell me about your interests - what do you enjoy doing in your free time?"

You: "I love trying new restaurants, hiking on weekends, and going to art museums. I'm vegetarian and lactose intolerant. I usually take public transit or bike."

Bot: "Perfect! I've created your profile with interests in food, outdoor adventures, and culture. 
Here's what to save:

📁 CREATE NEW FILE: `/profiles/settings/DEFAULT_USER.yaml`
[Shows complete file content to copy]

📁 CREATE NEW FILE: `/profiles/personal/ALEX_CHEN.yaml`
[Shows complete profile with all preferences]"
```

### 🍽️ Quick Activity Request
```
You: "I'm hungry but only have an hour"

Bot: "Here are quick lunch spots near you that fit your dietary needs:

1. **Green Garden Café** - 10 min walk
   - Excellent vegetarian options, clearly marked dairy-free items
   - Counter service, usually fast (30-45 min total)
   - Their Buddha bowl is amazing and filling

2. **Noodle Express** - 5 min bike ride
   - Vegetarian pho and rice noodle dishes
   - Ask for no egg in the veggie dishes
   - Quick service, perfect for your time constraint"
```

### 👥 Planning with Friends
```
You: "I want to plan something with Sarah and Marcus this weekend"

Bot: "I'll plan for the three of you! Checking everyone's preferences...

⚠️ Dietary considerations:
- You: Vegetarian, lactose intolerant
- Sarah: No restrictions (but has 3 kids)
- Marcus: No alcohol (in recovery)

Since Sarah has kids, here are family-friendly weekend activities:

1. **Saturday Morning: Farmers Market + Picnic**
   - Kid-friendly with live music
   - Tons of vegetarian food options
   - Marcus loves the craft vendor section
   - Plan for 10am-1pm

2. **Sunday: Children's Museum**
   - New interactive science exhibit
   - Café has great vegetarian options
   - No alcohol-focused environment ✓
   - 2-4pm works well for kid schedules

Should I check if these times work with everyone's calendars?"
```

### 🚊 Transit-Specific Planning
```
You: "I'm meeting Preston downtown but he only takes public transit"

Bot: "Since Preston prefers trains, here are great spots near transit stations:

1. **Union Station Food Hall** 
   - ⭐ Preston can take any train line directly there
   - You can bike (secure bike parking available)
   - Multiple vegetarian vendors
   - Great for lunch or early dinner

2. **Arts District Gallery Row**
   - 🚊 2 blocks from Metro Blue Line
   - First Friday art walk is tonight!
   - Several cafés with veg options nearby
   - Preston mentioned loving local art"
```

### 📝 Adding New People
```
You: "My new coworker Jordan is vegan and really into yoga. They love quiet coffee shops."

Bot: "I've created a profile for Jordan! Here's what to add to your knowledge base:

📁 CREATE NEW FILE: `/profiles/personal/JORDAN_LASTNAME.yaml`

Copy this entire content:
```yaml
Profile_Name: "JORDAN_LASTNAME"
Full_Name: "Jordan [Lastname]"
Active_Interest_Profiles: [WELLNESS_SEEKER, CULTURE_ENTHUSIAST]

Dietary_Restrictions:
  Type: vegan
  Coffee_Preferences: plant-based milk options

Environment_Avoids:
  Sensory: loud music, crowded spaces
  Preferences: quiet, calm atmospheres

Interests_Noted:
  - Yoga and meditation
  - Quiet coffee shops
  - Wellness activities

Relationship_To_User: "coworker"
Status: "incomplete - need last name and contact info"
```

💡 I'll remember to suggest vegan-friendly yoga studios and calm cafés when you're planning with Jordan!"
```

### 📅 Multi-Activity Planning
```
You: "Plan a date night with David - dinner, movie, then maybe drinks"

Bot: "Perfect date night plan for you and David:

**6:30 PM - Dinner at Botanica**
- ⚠️ FIXED: Reservation needed (I can't book, but here's the number: 555-0123)
- Amazing vegetarian tasting menu
- David loves their wine selection
- 90 minutes for relaxed dinner

**8:30 PM - Movie: "Art House Film"**
- ⚠️ FIXED: 8:45 PM showing at Independent Cinema
- 15-min walk from restaurant through the park
- Buy tickets now: [link]

**11:00 PM - Nightcap Options**
- ⚡ FLEXIBLE: Choose based on mood
- **Wine Bar 52** - David's favorite, open til 1am
- **Late Night Dessert** - Vegan ice cream shop til midnight

Want me to create calendar events and send David the plan?"
```

### 🔄 Updating Information
```
You: "Actually Marcus stopped drinking and Sarah just went gluten-free"

Bot: "I've updated both profiles! Here are the changes:

📝 UPDATE FILE: `/profiles/personal/MARCUS_JOHNSON.yaml`
[Shows complete updated profile with alcohol preferences changed]

📝 UPDATE FILE: `/profiles/personal/SARAH_WILLIAMS.yaml`
[Shows complete updated profile with gluten-free added to dietary restrictions]

This will affect my recommendations - I'll now avoid bars for Marcus and ensure gluten-free options for Sarah."
```

### 📊 Session Summary
```
You: "Show me all updates from today"

Bot: "Here's everything you need to update in your knowledge base:

📊 SESSION SUMMARY - March 15, 2024
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEW PROFILES CREATED: 2
1️⃣ `/profiles/personal/JORDAN_LASTNAME.yaml`
2️⃣ `/profiles/personal/LISA_WONG.yaml`

PROFILES UPDATED: 3
1️⃣ `/profiles/personal/MARCUS_JOHNSON.yaml` - removed alcohol
2️⃣ `/profiles/personal/SARAH_WILLIAMS.yaml` - added gluten-free
3️⃣ `/profiles/personal/PRESTON_TAYLOR.yaml` - updated email

NEW GROUPS: 1
1️⃣ `/profiles/groups/BOOK_CLUB.yaml`

Need me to show any specific update again?"
```

## How It Works

The system uses YAML files to store:
- **Personal Profiles**: Your preferences and those of your friends
- **Interest Profiles**: Types of activities (Foodie, Adventurer, etc.)
- **Group Profiles**: Common configurations of people you hang out with
- **Settings**: Your default identity and relationship mappings

## Tips for Best Results

1. **Be natural**: Say "I'm vegetarian and hate loud places" rather than listing restrictions
2. **Mention constraints**: "I have 2 hours" or "I prefer taking the train"
3. **Build incrementally**: You don't need to add everything at once
4. **Save updates**: When the bot shows you updates, copy them to keep your profiles current
5. **Ask about capabilities**: "Do you have calendar access?" to understand what's available

## Privacy & Data

- All profile data stays in your personal knowledge base
- The assistant only knows what you tell it and what's in your uploaded files
- You control all the information and can edit files directly
- No data is shared or stored outside your conversation

## Troubleshooting

**Bot says it lacks certain capabilities?**
- Core recommendations still work with just web search
- You can manually add calendar events based on suggestions
- Email templates can be provided for you to send yourself

**Recommendations seem generic?**
- Make sure you've set up your profile: "Set up my profile"
- Add more specific preferences: "I love spicy food and craft cocktails"
- Mention your location: "I'm in Brooklyn"

**Can't find someone's profile?**
- Check name variations: "Jon" vs "Jonathan"
- Ask: "Show me who you know about"
- Add them: "My friend Lisa loves hiking"

## Advanced Features

### 🌤️ Weather-Aware Planning
```
You: "What should we do this weekend?"
Bot: "I see rain is forecast for Saturday. Here are great indoor options..."
```

### ⏰ Smart Time Management
```
You: "I want to see a movie"
Bot: "⚠️ You have dinner plans at 7pm. The 4:30pm showing would work perfectly..."
```

### 🚇 Transit Optimization
```
You: "Find something we can all get to easily"
Bot: "Since Preston takes trains and Maya bikes, here are spots accessible by both..."
```

## Contributing

Feel free to submit issues or pull requests to improve the system!

## License

MIT License - Feel free to adapt this system for your needs