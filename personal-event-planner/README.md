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

## Example Conversations

```
You: "I'm hungry but only have an hour"
Bot: [Suggests quick lunch spots near you considering your dietary preferences]

You: "Plan something fun with Sarah this weekend"
Bot: [Checks both calendars, suggests family-friendly activities]

You: "My friend Jordan is vegan and loves art"
Bot: [Creates Jordan's profile, shows you the file to save]

You: "Add this to my calendar and invite Marcus"
Bot: [Creates event if calendar access available, or shows you what to add manually]
```

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

## Contributing

Feel free to submit issues or pull requests to improve the system!

## License

MIT License - Feel free to adapt this system for your needs
