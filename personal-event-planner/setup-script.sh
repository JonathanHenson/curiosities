#!/bin/bash

# Setup script for AI Activity Planning Assistant
# Run this from: the directory you want to initialize the repo

echo "🎯 Setting up AI Activity Planning Assistant"
echo "==========================================="

# Create main directory
mkdir -p personal-event-planner
cd personal-event-planner

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p knowledge_base/profiles/settings
mkdir -p knowledge_base/profiles/personal
mkdir -p knowledge_base/profiles/groups
mkdir -p knowledge_base/profiles/interests

# Create README.md
echo "📝 Creating README.md..."
cat > README.md << 'EOF'
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
EOF

# Create PROMPT.md
echo "📝 Creating PROMPT.md..."
cat > PROMPT.md << 'EOF'
# AI Activity Planning Assistant - System Prompt

## Capability Check and Disclosure

When starting a conversation or when asked about capabilities, check and disclose which tools you have available:
- ✅ Web Search
- ✅/❌ Calendar Integration  
- ✅/❌ Email Integration
- ✅ Knowledge Base Access
- ✅ Current Date/Time
- ✅/❌ Location Services

If any key capabilities are missing, inform the user:
"I can help you find activities and create plans! I currently have [list capabilities]. I don't have [missing capabilities], so I'll provide information you can use to [manually add to calendar/send emails yourself/etc.]"

## Core Instructions

You are a personal activity planning assistant that helps users find things to do based on their context, preferences, and social plans. You adapt your functionality based on available tools.

## INITIAL SETUP MODE

Check if `/profiles/settings/DEFAULT_USER.yaml` exists:
- If NO: Enter profile creation mode
- If YES: Load user preferences and operate normally

## PROFILE CREATION MODE

When no default user exists or user says "set up my profile", guide them through:

1. **Basic Info**: "Let's set up your profile! What should I call you?"
2. **Interests**: "What do you enjoy doing? (restaurants, hiking, museums, etc.)"
3. **Dietary Needs**: "Any dietary restrictions or food preferences?"
4. **Getting Around**: "How do you usually get around? (car, transit, bike, walk)"
5. **Environment**: "Any places or situations you prefer to avoid?"
6. **Schedule**: "When are you usually free for activities?"

Create natural conversation, not a form. Parse responses intelligently.

## OPERATING MODES

### 1. RECOMMENDATION MODE (Default)
When user asks for activities:
- Load relevant profiles from knowledge base
- Check current time, weather, location automatically
- Search for appropriate activities
- Check calendar for conflicts (only mention if conflicts exist)
- Present options with timing and logistics

### 2. PLANNING MODE
For future or multi-activity planning:
- Intelligently sequence activities
- Calculate realistic timing with buffers
- Identify fixed vs flexible timing
- Offer to create calendar events and send invites

### 3. PROFILE BUILDING MODE
When user mentions new people or preferences:
- Extract information naturally from conversation
- Create/update profiles
- Show complete file contents for user to save

## SMART BEHAVIORS

### Time Intelligence
- Assume "now" unless specified otherwise
- Only mention calendar/time if there are conflicts
- Include activity duration + travel time in calculations
- Know typical durations (dinner: 90-120min, movie: 150min, etc.)

### Name Matching
- "I/me/my" = DEFAULT_USER
- Match partial names ("Jon" → "Jonathan")
- "I'm with X" = create group with user + X
- Resolve relationships ("my partner" → check mapping)

### Transit Preferences
- Always check preferred transportation modes
- Highlight when preferred mode works well
- Suggest transit-friendly venues when applicable
- Consider weather impact on bike/walk preferences

### Updates Tracking
When user asks "show me updates" or after significant changes:
- Display complete file contents or sections
- Clear copy/paste instructions
- Use comments to mark what changed
- Organize multiple updates clearly

## KNOWLEDGE BASE STRUCTURE

Load and understand:
- `/profiles/settings/` - User identity and relationships
- `/profiles/personal/` - Individual profiles  
- `/profiles/interests/` - Activity type preferences
- `/profiles/groups/` - Pre-configured group combinations

## OUTPUT FORMATS

### Recommendations
- Bold venue names
- Include key details (dietary accommodations, transit access)
- Show timing only if relevant
- Explain why it matches preferences

### Profile Updates
Always show:
1. File path
2. Complete content to copy
3. Clear instructions
4. Highlight what's new/changed

### Calendar Events
When creating events:
- Accurate times with buffers
- Venue details and contact info
- Dietary/accessibility notes
- Flexibility indicators (FIXED vs FLEXIBLE)

## REMEMBER

- Be conversational, not robotic
- Don't mention technical details (YAML, knowledge base) unless necessary
- Learn from context without asking redundant questions
- Only discuss time/calendar when it matters
- Always validate email addresses before sending invites
- Keep responses focused and actionable

## Handling Missing Capabilities

### Without Calendar Integration:
- Still suggest activities with timing
- Provide formatted event details user can manually add
- Say: "I don't have calendar access, but here's what you can add to your calendar: [formatted details]"

### Without Email Integration:
- Provide email templates users can copy
- Include all relevant details for invites
- Say: "I can't send emails directly, but here's a message you can send: [template]"

### Without Location Services:
- Ask user for their location/city
- Remember it for the session
- Use location from context clues

### Core Functions Always Available:
- Searching for activities (with web search)
- Managing preference profiles
- Making recommendations based on preferences
- Planning multi-activity outings
- Showing knowledge base updates
EOF

# Create .gitignore
echo "📝 Creating .gitignore..."
cat > .gitignore << 'EOF'
# Ignore personal profiles but keep the structure
knowledge_base/profiles/personal/*.yaml
knowledge_base/profiles/groups/*.yaml
knowledge_base/profiles/settings/DEFAULT_USER.yaml

# Keep the template
!knowledge_base/profiles/settings/DEFAULT_USER_TEMPLATE.yaml

# OS files
.DS_Store
Thumbs.db
EOF

# Create DEFAULT_USER_TEMPLATE.yaml
echo "📝 Creating DEFAULT_USER_TEMPLATE.yaml..."
cat > knowledge_base/profiles/settings/DEFAULT_USER_TEMPLATE.yaml << 'EOF'
# RENAME THIS FILE TO DEFAULT_USER.yaml AFTER FILLING IN YOUR INFO
# Or let the AI assistant help you create it

# Your default identity (used when you say "I" or "me")
Default_User: YOUR_NAME_HERE

# Map relationships to profile names
Relationship_Map:
  # Examples:
  # - "my partner": PARTNER_NAME
  # - "my best friend": FRIEND_NAME
  # - "my mom": PARENT_NAME
  # - "my coworker": COLLEAGUE_NAME
EOF

# Create Interest Profiles
echo "📝 Creating interest profiles..."

# FOODIE.yaml
cat > knowledge_base/profiles/interests/FOODIE.yaml << 'EOF'
Profile_Type: "Interest"
Name: "FOODIE"
Description: "Loves exploring restaurants, food festivals, and culinary experiences"

Interests: 
  - Restaurant openings and reviews
  - Food festivals and markets
  - Cooking classes and demonstrations
  - Wine tastings and pairings
  - Brewery and distillery tours
  - Food truck gatherings
  - Ethnic cuisine exploration
  - Chef's table experiences

Preferred_Venues:
  - New and trending restaurants
  - Farmers markets
  - Food halls
  - Culinary schools
  - Wineries and breweries
  - Specialty food shops

Budget: "Moderate to high ($30-200 per person)"
Distance_Willing_To_Travel: "45 minutes for exceptional food"
Physical_Activity_Level: "Low"
Weather_Preferences: "Flexible, enjoys outdoor food events"
Avoids: "Chain restaurants, fast food"
EOF

# CULTURE_ENTHUSIAST.yaml
cat > knowledge_base/profiles/interests/CULTURE_ENTHUSIAST.yaml << 'EOF'
Profile_Type: "Interest"
Name: "CULTURE_ENTHUSIAST"
Description: "Enjoys arts, museums, theater, and cultural experiences"

Interests:
  - Art galleries and exhibitions
  - Museums (art, history, science)
  - Theater and performing arts
  - Live music and concerts
  - Poetry readings and literary events
  - Film festivals and indie cinema
  - Cultural festivals and celebrations
  - Historical tours and landmarks
  - Architecture walks

Preferred_Venues:
  - Museums and galleries
  - Theaters and concert halls
  - Independent cinemas
  - Bookstores with event spaces
  - Cultural centers
  - Historic sites

Budget: "Flexible ($0-150)"
Distance_Willing_To_Travel: "Within metro area"
Physical_Activity_Level: "Low to moderate"
Weather_Preferences: "Prefers indoor activities"
Avoids: "Loud bars/clubs, sports events"
EOF

# ADVENTURER.yaml
cat > knowledge_base/profiles/interests/ADVENTURER.yaml << 'EOF'
Profile_Type: "Interest"
Name: "ADVENTURER"
Description: "Loves outdoor activities and physical challenges"

Interests:
  - Hiking and trail running
  - Rock climbing and bouldering
  - Kayaking and paddleboarding
  - Mountain biking
  - Camping and backpacking
  - Outdoor fitness classes
  - Nature photography
  - Geocaching
  - Skiing/snowboarding (seasonal)

Preferred_Venues:
  - State and national parks
  - Hiking trails
  - Climbing gyms
  - Lakes and rivers
  - Bike paths
  - Outdoor recreation centers

Budget: "Moderate ($20-100 per activity)"
Distance_Willing_To_Travel: "Up to 2 hours"
Physical_Activity_Level: "High"
Weather_Preferences: "Enjoys all weather except severe storms"
Avoids: "Crowded indoor spaces, passive entertainment"
EOF

# BUDGET_EXPLORER.yaml
cat > knowledge_base/profiles/interests/BUDGET_EXPLORER.yaml << 'EOF'
Profile_Type: "Interest"
Name: "BUDGET_EXPLORER"
Description: "Seeks free and low-cost activities and experiences"

Interests:
  - Free museum days
  - Public lectures and talks
  - Community events and festivals
  - Library programs
  - Free outdoor concerts
  - Street fairs and parades
  - Volunteer opportunities
  - Public parks and gardens
  - Free walking tours

Preferred_Venues:
  - Public spaces
  - Libraries
  - Community centers
  - Parks and gardens
  - Free admission venues

Budget: "Minimal ($0-20)"
Distance_Willing_To_Travel: "Public transport accessible"
Physical_Activity_Level: "Flexible"
Weather_Preferences: "Adaptable"
Avoids: "Expensive ticketed events, high-end venues"
EOF

# WELLNESS_SEEKER.yaml
cat > knowledge_base/profiles/interests/WELLNESS_SEEKER.yaml << 'EOF'
Profile_Type: "Interest"
Name: "WELLNESS_SEEKER"
Description: "Focuses on health, mindfulness, and well-being activities"

Interests:
  - Yoga and meditation classes
  - Spa and wellness treatments
  - Nature walks and forest bathing
  - Wellness workshops and retreats
  - Healthy cooking classes
  - Sound baths and healing sessions
  - Mindfulness events
  - Holistic health fairs
  - Tai chi and qigong

Preferred_Venues:
  - Yoga studios
  - Spas and wellness centers
  - Parks and nature areas
  - Meditation centers
  - Health food stores with classes

Budget: "Moderate to high ($20-150)"
Distance_Willing_To_Travel: "1 hour"
Physical_Activity_Level: "Low to moderate"
Weather_Preferences: "Enjoys outdoor meditation/yoga"
Avoids: "Loud, chaotic environments, competitive activities"
EOF

# SOCIAL_BUTTERFLY.yaml
cat > knowledge_base/profiles/interests/SOCIAL_BUTTERFLY.yaml << 'EOF'
Profile_Type: "Interest"
Name: "SOCIAL_BUTTERFLY"
Description: "Thrives on social interaction and group activities"

Interests:
  - Nightlife and live music
  - Comedy shows
  - Trivia nights
  - Dance clubs and social dancing
  - Networking events
  - Speed dating and singles events
  - Group sports and games
  - Karaoke nights
  - Bar crawls and tastings

Preferred_Venues:
  - Bars and lounges
  - Music venues
  - Comedy clubs
  - Social halls
  - Rooftop bars
  - Event spaces

Budget: "Moderate ($30-100)"
Distance_Willing_To_Travel: "Within city/downtown"
Physical_Activity_Level: "Moderate"
Weather_Preferences: "Any"
Avoids: "Solo activities, quiet environments"
EOF

# Create .gitkeep files for empty directories
echo "📝 Creating directory markers..."
touch knowledge_base/profiles/personal/.gitkeep
touch knowledge_base/profiles/groups/.gitkeep

# Create setup.sh
echo "📝 Creating setup.sh..."
cat > setup.sh << 'EOF'
#!/bin/bash

echo "🎯 AI Activity Planning Assistant Setup"
echo "======================================="
echo ""

# Check if knowledge base exists
if [ -d "knowledge_base" ]; then
    echo "✅ Knowledge base structure found"
else
    echo "❌ Knowledge base not found. Please run this from the repository root."
    exit 1
fi

# Check for personal profile
if [ -f "knowledge_base/profiles/settings/DEFAULT_USER.yaml" ]; then
    echo "✅ Personal profile found"
else
    echo "📝 No personal profile found."
    echo "   Start by telling your AI: 'Set up my profile'"
    echo ""
    
    # Offer to create from template
    if [ -f "knowledge_base/profiles/settings/DEFAULT_USER_TEMPLATE.yaml" ]; then
        echo "Would you like to create DEFAULT_USER.yaml from the template? (y/n)"
        read -r response
        if [[ "$response" =~ ^[Yy]$ ]]; then
            cp knowledge_base/profiles/settings/DEFAULT_USER_TEMPLATE.yaml \
               knowledge_base/profiles/settings/DEFAULT_USER.yaml
            echo "✅ Created DEFAULT_USER.yaml - please edit it with your information"
        fi
    fi
fi

echo ""
echo "🚀 Setup complete! Next steps:"
echo "   1. Upload the knowledge_base folder to your AI assistant"
echo "   2. Give your AI the PROMPT.md as instructions"
echo "   3. Say 'Hi, I'd like to set up my profile' to get started"
echo ""
EOF

chmod +x setup.sh

echo ""
echo "✅ All files created successfully!"
echo ""
echo "📁 Project structure:"
echo "personal-event-planner/"
echo "├── README.md"
echo "├── PROMPT.md"
echo "├── setup.sh"
echo "├── .gitignore"
echo "└── knowledge_base/"
echo "    └── profiles/"
echo "        ├── settings/"
echo "        │   └── DEFAULT_USER_TEMPLATE.yaml"
echo "        ├── interests/"
echo "        │   ├── ADVENTURER.yaml"
echo "        │   ├── BUDGET_EXPLORER.yaml"
echo "        │   ├── CULTURE_ENTHUSIAST.yaml"
echo "        │   ├── FOODIE.yaml"
echo "        │   ├── SOCIAL_BUTTERFLY.yaml"
echo "        │   └── WELLNESS_SEEKER.yaml"
echo "        ├── personal/"
echo "        │   └── .gitkeep"
echo "        └── groups/"
echo "            └── .gitkeep"
echo ""
echo "🚀 Next steps:"
echo "1. cd personal-event-planner"
echo "2. git init"
echo "3. git add ."
echo "4. git commit -m 'Initial commit: AI Activity Planning Assistant'"
echo "5. Create a GitHub repo and push your code"
echo ""
echo "📚 To use the assistant:"
echo "1. Upload the knowledge_base folder to your AI"
echo "2. Give it the PROMPT.md as instructions"
echo "3. Start with: 'Hi, I'd like to set up my profile'"
