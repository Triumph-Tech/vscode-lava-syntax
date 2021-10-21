"support-function": {
  "match": "(\\|)\\s*(First|Last|Append|Capitalize|Decrypt|Default|Downcase|Escape|EscapeDataString|FromMarkdown|HtmlDecode|Humanize|Linkify|NewlineToBr|Pluralize|PluralizeForQuantity|Possessive|Prepend|ReadTime|RegExMatchValues|RegExMatchValue|RegExMatch|Remove|RemoveFirst|Replace|ReplaceFirst|ReplaceLast|Right|SanitizeSql|SentenceCase|Singularize|Size|Slice|Split|StripHtml|StripNewlines|TitleCase|ToCssClass|ToPascal|Trim|Truncate|TruncateWords|UnescapeDataString|Upcase|WithFallback|Date|DateAdd|DateDiff|DatesFromICal|DaysFromNow|DaysInMonth|DaysSince|DaysUntil|HumanizeDateTime|HumanizeTimeSpan|NextDayOfTheWeek|SundayDate|ToMidnight|AtLeast|AtMost|Ceiling|DividedBy|Floor|FormatAsCurrency|Format|Minus|Modulo|NumberToOrdinal|NumberToOrdinalWords|NumberToRomanNumerals|NumberToWords|ObfuscateEmail|Plus|Times|ToQuantity|ToString|Lighten|Darken|Desaturate|Saturate|FadeIn|FadeOut|AdjustHue|Tint|Shade|Mix|Grayscale|Contains|Indexer|Join|Map|OrderBy|Select|Shuffle|Size|Sort|SortByAttribute|Uniq|Where|Address|Campus|Children|DeleteUserPreference|FamilySalutation|GeofencingGroupMembers|GeofencingGroups|GetPersonAlternateId|GetUserPreference|Group|Groups|GroupsAttended|HasSignedDocument|HeadOfHousehold|LastAttendedGroupOfType|NearestGroup|Parents|PersonActionIdentifier|PersonByAliasGuid|PersonByAliasId|PersonByGuid|PersonById|PersonByPersonAlternateId|PersonImpersonationToken|PersonTokenCreate|PersonTokenRead|PhoneNumber|SetUserPreference|Spouse|ZebraPhoto|Attribute|AddLinkTagToHead|AddMetaTagToHead|Postback|SetPageTitle|PropertyToKeyValue|Page|PageRedirect|Property|HasRightsTo|Notes|PageParameter|FromCache|ResolveRockUrl|AsBoolean|AsInteger|AsDecimal|AsDouble|AsString|AsDateTime|Debug|Client|AddCssLink|AddScriptLink|Url|Base64Encode|GroupById|GroupByGuid|CreateShortLink|Md5|Sha1|Sha256|HmacSha1|HmacSha256|XamlWrap|PersistedDataset|AppendFollowing|FilterFollowed|FilterUnfollowed|ToJSON|FromJSON|AddToArray|Distinct|GroupBy|RemoveFromArray|Sum|AddToDictionary|AllKeysFromDictionary|RemoveFromDictionary|AddResponseHeader|FromBase64|PageRoute|RunLava|RegExReplace|WriteCookie|RandomNumber|RandomNumber|Index|EntityFromCachedObject|ImageUrl|IsFollowed|ReadCookie|RockInstanceConfig|AddQuickReturn|UniqueIdentifier|TriumphImgCdn|Steps)\\:?(.*?)(?=(?:\\b\\s*\\||-%}|-}}|%}|}}))",
  "captures": {
    "1": {
      "name": "punctuation.definition.tag.lava"
    },
    "2": {
      "name": "entity.name.function.lava"
    },
    "3": {
      "patterns": [
        {
          "include": "#string-quoted-double"
        },
        {
          "include": "#string-quoted-single"
        },
        {
          "match": "[^,\\|]*\\b",
          "name": "variable.parameter.lava"
        }
      ]
    }
  }
},