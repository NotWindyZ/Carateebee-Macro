import { useState, useEffect, useRef, useCallback } from 'react';

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: (() => void) | undefined;
    }
}

const OST_LIST = [
    { id: "WttUxO0EooA", title: "Bakushin Bakushin Bakushin", artist: "Sakura Bakushin O", duration: "4:00" },
    { id: "FCj0FsgzVS4", title: "(Game OST) Uma Musume - Girls Legend U (Opening theme)", artist: "A dumb horse", duration: "4:52" },
    { id: "trSFxtEk9oA", title: "(Game OST) Uma Musume - Prologue", artist: "A dumb horse", duration: "1:25" },
    { id: "gZbOFCgDuQ4", title: "(Game OST) Uma Musume - Gacha Menu", artist: "A dumb horse", duration: "3:19" },
    { id: "no9GJ0R3od8", title: "(Game OST) Uma Musume Pretty Derby - Support Gacha", artist: "A dumb horse", duration: "3:20" },
    { id: "A-podc_azuI", title: "(Game OST) Uma Musume Pretty Derby - Character Gacha", artist: "A dumb horse", duration: "3:29" },
    { id: "qakZV0zWX4U", title: "(Game OST) Uma Musume - Story Menu", artist: "A dumb horse", duration: "6:42" },
    { id: "YnRcrjgVc7w", title: "(Game OST) Uma Musume - Trainer Archives", artist: "A dumb horse", duration: "1:58" },
    { id: "6vwjzUUTCMU", title: "(Game OST) Uma Musume - Tracen Academy (day)", artist: "A dumb horse", duration: "2:42" },
    { id: "Ow8Oy6OmtOk", title: "(Game OST) Uma Musume - Tracen Academy (night)", artist: "A dumb horse", duration: "2:54" },
    { id: "YIfFvzwiNvM", title: "(Game OST) Uma Musume - Character Select (Make Debut)", artist: "A dumb horse", duration: "8:09" },
    { id: "d7dyMhauYAk", title: "(Game OST) Uma Musume - URA Campaign (Year 1)", artist: "A dumb horse", duration: "3:38" },
    { id: "mY1mm1tnw6s", title: "(Game OST) Uma Musume - Jingle Bells", artist: "A dumb horse", duration: "2:48" },
    { id: "aqpdkjC0VBg", title: "(Game OST) Uma Musume - URA Campaign (Year 2 & 3)", artist: "A dumb horse", duration: "5:14" },
    { id: "ZRQCtUbg1nQ", title: "(Game OST) Uma Musume - URA Campaign (Summer training)", artist: "A dumb horse", duration: "2:59" },
    { id: "CejMkVpLMKE", title: "(Game OST) Uma Musume - Skill Activation (Yume Wo Kakeru)", artist: "A dumb horse", duration: "3:34" },
    { id: "AxM64lvGgM4", title: "(Game OST) Uma Musume - Race Preparation", artist: "A dumb horse", duration: "3:25" },
    { id: "V-D30oV95So", title: "(Game OST) Uma Musume - Entry Table 1", artist: "A dumb horse", duration: "2:29" },
    { id: "QbBivSwtqu8", title: "(Game OST) Uma Musume - Entry Table 2", artist: "A dumb horse", duration: "4:24" },
    { id: "EEVUprSfWPk", title: "(Game OST) Uma Musume - Paddock (Debut)", artist: "A dumb horse", duration: "2:03" },
    { id: "WbFVZcEyNeY", title: "(Game OST) Uma Musume - Paddock (Daily races)", artist: "A dumb horse", duration: "2:54" },
    { id: "2h83Kz8OrOY", title: "(Game OST) Uma Musume - Paddock (Exhibition races)", artist: "A dumb horse", duration: "1:26" },
    { id: "NP6VstdKJjc", title: "(Game OST) Uma Musume - Paddock (Graded races)", artist: "A dumb horse", duration: "3:58" },
    { id: "Y2w14hpOQ7g", title: "(Game OST) Uma Musume - Paddock (Twinkle Star Climax)", artist: "A dumb horse", duration: "4:11" },
    { id: "2lwaK38Id9M", title: "(Game OST) Uma Musume - Victory", artist: "A dumb horse", duration: "1:16" },
    { id: "AbaxHNaZx74", title: "(Game OST) Uma Musume - Draw", artist: "A dumb horse", duration: "1:07" },
    { id: "gzgiaat0YyE", title: "(Game OST) Uma Musume - Lose", artist: "A dumb horse", duration: "1:37" },
    { id: "JsWdsv-QrqQ", title: "(Game OST) Uma Musume - Daily 1/Debut race + last spurt", artist: "A dumb horse", duration: "3:45" },
    { id: "y8Ryv1pbtCY", title: "(Game OST) Uma Musume - Daily 2/Open Race + last spurt", artist: "A dumb horse", duration: "7:02" },
    { id: "9y0G62F9PVE", title: "(Game OST) Uma Musume - GIII Race + last spurt", artist: "A dumb horse", duration: "7:20" },
    { id: "8UC6AQyRoc8", title: "(Game OST) Uma Musume - GII Race + last spurt", artist: "A dumb horse", duration: "7:04" },
    { id: "NOZRake-vQk", title: "(Game OST) Uma Musume - GI Race/URA qualifiers + last spurt", artist: "A dumb horse", duration: "6:24" },
    { id: "dlzBwla0NFo", title: "(Game OST) Uma Musume - Arima Kinen (story version)", artist: "A dumb horse", duration: "1:58" },
    { id: "TC_Ainr4A9k", title: "(Game OST) Uma Musume - Derby Winners (Story mode)", artist: "A dumb horse", duration: "4:36" },
    { id: "Y1KofECuYEc", title: "(Game OST) Uma Musume - Japan Derby/Arima Kinen (Special Story ver.) + last spurt", artist: "A dumb horse", duration: "3:00" },
    { id: "Itb3LHBTdDQ", title: "(Game OST) Uma Musume -Arima Kinen/Japan Derby + last spurt", artist: "A dumb horse", duration: "7:46" },
    { id: "UesM55cxu-o", title: "(Game OST) Uma Musume - Aoharu Cup (Unity Cup) - Training 1", artist: "A dumb horse", duration: "5:28" },
    { id: "Tn6s40nuI0w", title: "(Game OST) Uma Musume - Aoharu Cup (Unity Cup) - Training 2", artist: "A dumb horse", duration: "5:34" },
    { id: "Gdtrve-mA3Y", title: "(Game OST) Uma Musume - Aoharu Cup (Unity Cup) - Training 3", artist: "A dumb horse", duration: "4:46" },
    { id: "dr4d_1Y5RJc", title: "(Game OST) Uma Musume - Aoharu Cup (Unity Cup) Pre-season Race Preparation", artist: "A dumb horse", duration: "3:01" },
    { id: "w3XWckZCYrQ", title: "[Private video]", artist: "Unknown", duration: "0:00" },
    { id: "U_pV7XabJ3Y", title: "(Game OST) Uma Musume - Team First", artist: "A dumb horse", duration: "4:48" },
    { id: "MVCk_Xk3nh4", title: "(Game OST) Uma Musume - Aoharu Cup (Unity Cup) Final Race Preparation", artist: "A dumb horse", duration: "2:46" },
    { id: "wuORG32-ZnE", title: "[Private video]", artist: "Unknown", duration: "0:00" },
    { id: "Cdy3wbUiL9E", title: "(Game OST) Uma Musume - Make a New Track (Trackblazer) (Junior - Classic)", artist: "A dumb horse", duration: "5:19" },
    { id: "qIelaoprSDI", title: "(Game OST) Uma Musume - Make a New Track (Trackblazer) (Senior)", artist: "A dumb horse", duration: "4:29" },
    { id: "TXBu0So8luk", title: "(Game OST) Uma Musume - Twinkle Star Climax final race + last spurt", artist: "A dumb horse", duration: "4:22" },
    { id: "nlt7nhoNn-Y", title: "(Game OST) Uma Musume - Twinkle Star Climax semifinal last spurt", artist: "A dumb horse", duration: "1:15" },
    { id: "Mo5-5MGEKxI", title: "(Game OST) Uma Musume - Grand Live", artist: "A dumb horse", duration: "2:03" },
    { id: "xiQdzgtWYnk", title: "(Game OST) Uma Musume - Grand Live - Prologue", artist: "A dumb horse", duration: "1:48" },
    { id: "tyftrYQVwQg", title: "(Game OST) Uma Musume - Our Grand Live - Junior/Classic year", artist: "A dumb horse", duration: "4:52" },
    { id: "5DX5-t8JLbI", title: "(Game OST) Uma Musume - Our Grand Live - Senior year", artist: "A dumb horse", duration: "6:31" },
    { id: "1iAxvgLDC2A", title: "(Game OST) Uma Musume - Grand Masters - Junior/Classic year", artist: "A dumb horse", duration: "4:54" },
    { id: "azODC7ml5EI", title: "(Game OST) Uma Musume - Grand Masters - Senior year", artist: "A dumb horse", duration: "5:26" },
    { id: "UTcwnCz4-UY", title: "(Game OST) Uma Musume - Grand Masters Grow Up Race + last spurt", artist: "A dumb horse", duration: "6:18" },
    { id: "p0ORb9LBTTk", title: "(Game OST) Uma Musume - Grand Masters Super/World Breeders Cup + last spurt", artist: "A dumb horse", duration: "5:38" },
    { id: "YLcT3SOo4rk", title: "(Game OST) Uma Musume - Grand Masters Final Race + last spurt", artist: "A dumb horse", duration: "6:20" },
    { id: "tS7iEKjxfuQ", title: "(Game OST) Uma Musume - Campaign End", artist: "A dumb horse", duration: "1:31" },
    { id: "ljg6EGhza-4", title: "(Game OST) Uma Musume - Achievement", artist: "A dumb horse", duration: "1:15" },
    { id: "DF-WhWTA8j4", title: "(Game OST) Uma Musume - Game Over", artist: "A dumb horse", duration: "0:50" },
    { id: "j4nvodSXTw0", title: "Uma Musume 4K MV - Make Debut!", artist: "A dumb horse", duration: "2:22" },
    { id: "1htj89pKPTE", title: "Uma Musume 4K MV - Yume wo Kakeru", artist: "A dumb horse", duration: "2:35" },
    { id: "mJulRY_SyYg", title: "Uma Musume 4K MV - Winning The Soul", artist: "A dumb horse", duration: "2:23" },
    { id: "o9IAAF1a0Ms", title: "Uma Musume 4K MV - Endless Dream", artist: "A dumb horse", duration: "2:09" },
    { id: "O1wNNfuog2U", title: "Uma Musume 4K MV - Irodori Phantasia", artist: "A dumb horse", duration: "2:19" },
    { id: "80Yv5qQfxO8", title: "Uma Musume 4K MV - Next Frontier", artist: "A dumb horse", duration: "2:21" },
    { id: "7MVrsWJcnOA", title: "Uma Musume 4K MV - Instinct Speed", artist: "A dumb horse", duration: "2:16" },
    { id: "l7YC58j6PDI", title: "Uma Musume 4K MV - Unlimited Impact", artist: "A dumb horse", duration: "2:14" },
    { id: "3mfpVD8tZMw", title: "Uma Musume 4K MV - Special Record", artist: "A dumb horse", duration: "2:04" },
    { id: "07B26JCPFbQ", title: "Uma Musume 4K MV - Never Looking Back", artist: "A dumb horse", duration: "2:06" },
    { id: "3KYmn-sgOBU", title: "Uma Musume 4K MV - WINnin' 5 - Winning ☆ Five -", artist: "A dumb horse", duration: "2:33" },
    { id: "4nxG7dFL1I8", title: "Uma Musume 4K MV - BLOW my GALE", artist: "A dumb horse", duration: "2:18" },
    { id: "7ult6HFqZX8", title: "Uma Musume 4K MV - Ms. VICTORIA (Champions Meeting winning live)", artist: "A dumb horse", duration: "2:48" },
    { id: "-xfD0r5ztoE", title: "Uma Musume 4K MV - Everlasting Beats", artist: "A dumb horse", duration: "2:22" },
    { id: "isC5grycwuw", title: "Uma Musume 4K MV - Pyoitto♪ Hallelujah!", artist: "A dumb horse", duration: "2:23" },
    { id: "EwVPdytq9UY", title: "Uma Musume 4K MV - Grow Up Shine!", artist: "A dumb horse", duration: "2:11" },
    { id: "kS0KLJYkXJU", title: "Uma Musume 4K MV - We are DREAMERS!!", artist: "A dumb horse", duration: "2:33" },
    { id: "31T2b6aUKMY", title: "Uma Musume 4K MV - Umapyoi Densetsu", artist: "A dumb horse", duration: "2:18" },
    { id: "DwemcdMTh-M", title: "Uma Musume 4K MV - Girls Legend U (short version)", artist: "A dumb horse", duration: "1:47" },
    { id: "3klmUIPlR1g", title: "Uma Musume 4K MV - Girls Legend U (long version)", artist: "A dumb horse", duration: "3:12" },
    { id: "IJtF0SaS3aA", title: "Uma Musume 4K MV - The Beginning Signal", artist: "A dumb horse", duration: "2:13" },
    { id: "_yrPfEfxORg", title: "Uma Musume 4K MV - A Small Wish", artist: "A dumb horse", duration: "2:17" },
    { id: "IdSUTeKyoq0", title: "Uma Musume 4K MV - Those Tears are for the tomorrow", artist: "A dumb horse", duration: "2:21" },
    { id: "bqe3Nll_dEU", title: "Uma Musume 4K MV - Blaze", artist: "A dumb horse", duration: "2:19" },
    { id: "eMkl3tUIQYM", title: "Uma Musume 4K MV - Transforming", artist: "A dumb horse", duration: "3:01" },
    { id: "a4zL4Zd574c", title: "Uma Musume 4K MV - Next Frontier (Main Story Version)", artist: "A dumb horse", duration: "2:22" },
    { id: "r-BI2O9aj-k", title: "Uma Musume 4K MV - Egao no Takaramono - Beyond the Future! -", artist: "A dumb horse", duration: "2:43" },
    { id: "eUFiz5l6p34", title: "Uma Musume 4K MV - Gaze on Me", artist: "A dumb horse", duration: "2:41" },
    { id: "6uXr1_6dLMY", title: "Uma Musume 4K MV - Overrunner!", artist: "A dumb horse", duration: "2:32" },
    { id: "Hl3iajBp1A4", title: "Uma Musume 4K MV - Dramatic Journey", artist: "A dumb horse", duration: "2:50" },
    { id: "OYpIiLRnzho", title: "(Game OST) Uma Musume - Legend Race + last spurt", artist: "A dumb horse", duration: "7:40" },
    { id: "FQj8THbYkq8", title: "(Game OST) Uma Musume - Champions Meeting", artist: "A dumb horse", duration: "3:30" },
    { id: "K8pKic4_auQ", title: "(Game OST) Uma Musume - Champions Meeting/Racing Carnival race  + last spurt", artist: "A dumb horse", duration: "6:42" },
    { id: "WE5KjN1H5O4", title: "(Game OST) Uma Musume - Champions Meeting Final race + last spurt", artist: "A dumb horse", duration: "7:02" },
    { id: "ipv6zDHKZ_0", title: "(Game OST) Uma Musume - Racing Carnival", artist: "A dumb horse", duration: "2:02" },
    { id: "jGmOVFPrCG4", title: "(Game OST) Uma Musume - Racing Carnival Extreme Race + last spurt", artist: "A dumb horse", duration: "5:41" },
    { id: "cJaKBifO-oo", title: "(Game OST) Uma Musume - Aim for the Strongest Team", artist: "A dumb horse", duration: "3:14" },
    { id: "HsvqLBfTXa4", title: "(Game OST) Uma Musume - Scout Race + last spurt", artist: "A dumb horse", duration: "6:33" },
    { id: "IlJmfq41WZI", title: "(Game OST) Uma Musume - Circle Room/Shop Menu", artist: "A dumb horse", duration: "3:45" },
    { id: "oI01e6w4qiA", title: "(Game OST) Uma Musume - Story BGM 1", artist: "A dumb horse", duration: "4:33" },
    { id: "5f0m3rMnZZU", title: "(Game OST) Uma Musume - Story BGM 2 (Silent Star)", artist: "A dumb horse", duration: "4:33" },
    { id: "mew3NzDoEaU", title: "(Game OST) Uma Musume - Story BGM 3", artist: "A dumb horse", duration: "3:13" },
    { id: "FBhwC7aNLFo", title: "(Game OST) Uma Musume - Story BGM 4", artist: "A dumb horse", duration: "4:57" },
    { id: "IMWFnYnQVRw", title: "(Game OST) Uma Musume - Copano Rickey", artist: "A dumb horse", duration: "2:23" },
    { id: "ap4ytNPptx4", title: "(Game OST) Uma Musume - L'arc de Triomphe (main story version)", artist: "A dumb horse", duration: "3:48" },
    { id: "gJkPJl_2eSQ", title: "(Game OST) Uma Musume - Team Race 1 (Fanfare For Future)", artist: "A dumb horse", duration: "1:38" },
    { id: "Uq7YXGatnI8", title: "(Game OST) Uma Musume - Team Race 2 (Kiseki wo Shinjite)", artist: "A dumb horse", duration: "1:26" },
    { id: "nJyetREnv8Y", title: "(Game OST) Uma Musume - Team Race 3 (PRESENT MARCH)", artist: "A dumb horse", duration: "1:28" },
    { id: "LD6EjHYcLEo", title: "(Game OST) Uma Musume - Team Race 4 (Seishun ga Matte)", artist: "A dumb horse", duration: "2:01" },
    { id: "OGWp0ILKDYw", title: "(Game OST) Uma Musume - Team Race 5 (Yumezora)", artist: "A dumb horse", duration: "1:27" },
    { id: "WttUxO0EooA", title: "(Game OST) Uma Musume - Bakushin Bakushin Bakushinshin", artist: "A dumb horse", duration: "4:53" },
    { id: "iNfemqp0PlU", title: "(Game OST) Uma Musume - Golshin Golshin Golshishin", artist: "A dumb horse", duration: "0:32" },
    { id: "Ae8OXBJG6rY", title: "(Game OST) Uma Musume - Make Debut (off-vocal)", artist: "A dumb horse", duration: "2:26" },
    { id: "MJGuANWXNpY", title: "(Game OST) Uma Musume - Winning The Soul (off-vocal)", artist: "A dumb horse", duration: "2:25" },
    { id: "W16AXI5QNJA", title: "(Game OST) Uma Musume - Irodori Phantasia (off-vocal)", artist: "A dumb horse", duration: "2:21" },
    { id: "tzFOH8sn8hw", title: "(Game OST) Uma Musume - Unlimited Impact (off-vocal)", artist: "A dumb horse", duration: "2:12" },
    { id: "ohlatNJOXUw", title: "(Game OST) Uma Musume - Next Frontier (off-vocal)", artist: "A dumb horse", duration: "2:22" },
    { id: "7zkbLcm-Tfw", title: "(Game OST) Uma Musume - Instinct Speed (off-vocal)", artist: "A dumb horse", duration: "2:19" },
    { id: "aQVSmhzL0l4", title: "(Game OST) Uma Musume - Umapyoi Densetsu (off-vocal)", artist: "A dumb horse", duration: "2:19" },
    { id: "I-qGltGOjG4", title: "(Game OST) Uma Musume - Pyoitto♪ Hallelujah! (off-vocal)", artist: "A dumb horse", duration: "2:24" },
    { id: "bFG9e0RtIh8", title: "(Game OST) Uma Musume - BLAZE (off-vocal)", artist: "A dumb horse", duration: "2:19" },
    { id: "KSSAKm7-Nkg", title: "(Game OST) Uma Musume - Transforming (off-vocal)", artist: "A dumb horse", duration: "3:01" },
    { id: "Pck91Yga3FQ", title: "(Game OST) Uma Musume - Winning ☆ Five (off-vocal)", artist: "A dumb horse", duration: "2:37" },
    { id: "F1Vy_1RzQLQ", title: "(Game OST) Uma Musume - Grow Up Shine! (off-vocal)", artist: "A dumb horse", duration: "2:13" },
    { id: "etPIqWir28Y", title: "(Game OST) Uma Musume - Never Looking Back (off-vocal)", artist: "A dumb horse", duration: "2:07" },
    { id: "Tc2mNGyurRw", title: "(Game OST) Uma Musume - We are DREAMERS!! (off-vocal)", artist: "A dumb horse", duration: "2:36" },
    { id: "gufytUWAJD0", title: "(Game OST) Uma Musume - BLOW my GALE (off-vocal)", artist: "A dumb horse", duration: "2:18" },
    { id: "YmL91EzW4p4", title: "(Game OST) Uma Musume - Egao no Takaramono - Beyond the Future! (off-vocal)", artist: "A dumb horse", duration: "2:45" },
    { id: "UUxKArIcCFU", title: "(Game OST) Uma Musume - Gaze on Me (off-vocal)", artist: "A dumb horse", duration: "2:41" },
    { id: "0Ecve1pjCqQ", title: "(Game OST) Uma Musume - Girls Legend U (off-vocal)", artist: "A dumb horse", duration: "3:15" },
    { id: "4e74ks9MEYo", title: "(Game OST) Uma Musume - Roulette Derby", artist: "A dumb horse", duration: "2:56" },
    { id: "KpI7sZ3FmLI", title: "(Game OST) Uma Musume - Summer Event (Umapyoi disco ver.)", artist: "A dumb horse", duration: "4:07" },
    { id: "UXw0a74QK_U", title: "(Game OST) Uma Musume - Summer Event mission menu", artist: "A dumb horse", duration: "5:38" },
    { id: "rU3u-IBjj5o", title: "(Game OST) Uma Musume - Make up in Halloween! Event", artist: "A dumb horse", duration: "3:33" },
    { id: "gYy4ZJr9GNQ", title: "(Game OST) Uma Musume - Late Autumn,  The Music Echoes", artist: "A dumb horse", duration: "4:06" },
    { id: "-SJzcfYs518", title: "(Game OST) Uma Musume - Late Autumn,  The Music Echoes mission menu", artist: "A dumb horse", duration: "2:26" },
    { id: "9UiR0q4hmT4", title: "(Game OST) Uma Musume - Overlapping Miracles on a Holy Night", artist: "A dumb horse", duration: "4:26" },
    { id: "tW_rOWAVGwE", title: "(Game OST) Uma Musume - Overlapping Miracles on a Holy Night mission menu", artist: "A dumb horse", duration: "3:45" },
    { id: "OiIdWUgOMTk", title: "(Game OST) Uma Musume - Overlapping Miracles on a Holy Night - Christmas Wish", artist: "A dumb horse", duration: "1:58" },
    { id: "CYfqfmzB6qo", title: "(Game OST) Uma Musume - Blossoming Reunion! New Year's Karuta Battle", artist: "A dumb horse", duration: "4:11" },
    { id: "lu4ucRY100A", title: "(Game OST) Uma Musume - Blossoming Reunion! New Year's Karuta Battle mission menu", artist: "A dumb horse", duration: "6:20" },
    { id: "nBuAybUQXeo", title: "(Game OST) Uma Musume - Crowned Patisserie", artist: "A dumb horse", duration: "5:16" },
    { id: "1hISq1Uz_Sw", title: "(Game OST) Uma Musume - Flapping Run-up!", artist: "A dumb horse", duration: "3:40" },
    { id: "6Z9cMp77uSE", title: "(Game OST) Uma Musume - Flapping Run-up! mission menu", artist: "A dumb horse", duration: "4:51" },
    { id: "4buPpfP_xEA", title: "(Game OST) Uma Musume - Tonight, at Ligne Droite - Drop", artist: "A dumb horse", duration: "5:02" },
    { id: "ygQj7sPp_dA", title: "(Game OST) Uma Musume - Roar, Yell! Tracen Academy Cheering Squad - BGM 01", artist: "A dumb horse", duration: "2:46" },
    { id: "Dc1HiqX6eas", title: "(Game OST) Uma Musume - Roar, Yell! Tracen Academy Cheering Squad - BGM 02", artist: "A dumb horse", duration: "4:21" },
    { id: "Qxl8L2Eiow8", title: "(Game OST) Uma Musume - Roar, Yell! Tracen Academy Cheering Squad - BGM 03", artist: "A dumb horse", duration: "4:45" },
    { id: "9-31UNVRgYs", title: "(Game OST) Uma Musume - Roar, Yell! Tracen Academy Cheering Squad - BGM 04", artist: "A dumb horse", duration: "5:46" },
    { id: "qzbCDU03U7Y", title: "(Game OST) Uma Musume - Time ～Silks and Three Riddles～ - BGM 01", artist: "A dumb horse", duration: "4:16" },
    { id: "c7q6G3V_ako", title: "(Game OST) Uma Musume - Time ～Silks and Three Riddles～ - BGM 02", artist: "A dumb horse", duration: "4:02" },
    { id: "xnZxDJSvEkc", title: "(Game OST) Uma Musume - Time ～Silks and Three Riddles～ - BGM 03", artist: "A dumb horse", duration: "10:52" },
    { id: "-ptfx9c4sQ8", title: "(Game OST) Uma Musume - Seek-Solve Summer Walk - BGM 01", artist: "A dumb horse", duration: "10:22" },
    { id: "ajah5BDmJiU", title: "(Game OST) Uma Musume - Seek-Solve Summer Walk - BGM 02", artist: "A dumb horse", duration: "5:20" },
    { id: "5B7nwYnqCyk", title: "(Game OST) Uma Musume - Seek-Solve Summer Walk - BGM 03", artist: "A dumb horse", duration: "4:36" },
    { id: "3m7TFFMIqpE", title: "(Game OST) Uma Musume - Seek-Solve Summer Walk - BGM 04", artist: "A dumb horse", duration: "2:30" },
    { id: "SSMJfrdjeD4", title: "(Game OST) Uma Musume - Battle royale!? Summer-colored Vacation - BGM", artist: "A dumb horse", duration: "5:04" },
    { id: "0k-mcwsOwb4", title: "(Game OST) Uma Musume - Iron Wing's Steam Tale - BGM 01", artist: "A dumb horse", duration: "5:26" },
    { id: "SaFHhalfZVU", title: "(Game OST) Uma Musume - Iron Wing's Steam Tale - BGM 02", artist: "A dumb horse", duration: "4:52" },
    { id: "1R2Tsa9epdA", title: "(Game OST) Uma Musume - Iron Wing's Steam Tale - BGM 03", artist: "A dumb horse", duration: "4:35" },
    { id: "1MN9dJOWW9M", title: "(Game OST) Uma Musume - Iron Wing's Steam Tale - BGM 04", artist: "A dumb horse", duration: "5:09" },
    { id: "HzfyDhE-ZHU", title: "(Game OST) Uma Musume - Iron Wing's Steam Tale - BGM 05", artist: "A dumb horse", duration: "5:41" },
    { id: "llVvWoxSjFs", title: "(Game OST) Uma Musume - Days In A Flash - BGM 01", artist: "A dumb horse", duration: "8:08" },
    { id: "eK4whNtNSik", title: "(Game OST) Uma Musume - Days In A Flash - BGM 02", artist: "A dumb horse", duration: "4:45" },
    { id: "pG3VWSp269c", title: "(Game OST) Uma Musume - Days In A Flash - BGM 03", artist: "A dumb horse", duration: "3:56" },
    { id: "QHvasJAaOZc", title: "(Game OST) Uma Musume - Days In A Flash - BGM 04", artist: "A dumb horse", duration: "3:03" },
    { id: "FNTdfDThb1w", title: "(Game OST) Uma Musume - Crane Game (Grow Up Shine!)", artist: "A dumb horse", duration: "1:01" },
    { id: "3Z-YWnPpgl4", title: "(Game OST) Uma Musume - Crane Game (Umapyoi Densetsu)", artist: "A dumb horse", duration: "1:14" },
    { id: "PrebiCcf0-8", title: "(Game OST) Uma Musume - Crane Game (Fanfare for Future!)", artist: "A dumb horse", duration: "1:15" },
    { id: "RGZseWv3w8Y", title: "Uma Musume Pretty Derby - All GI Fanfares", artist: "A dumb horse", duration: "10:43" },
    { id: "-hOi2Mgp6Ig", title: "(Game OST) Uma Musume - RUNxRUN! (unused song)", artist: "A dumb horse", duration: "4:56" },
    { id: "M2hT5btox6s", title: "(Game OST) Uma Musume - Fanfare For Future (Grand Live ver)", artist: "A dumb horse", duration: "1:41" },
    { id: "tR1QMKeAj_8", title: "(Game OST) Uma Musume - Arima Kinen/Japan Derby (prototype ver)", artist: "A dumb horse", duration: "3:15" },
    { id: "s1bAAlMRUJI", title: "(Game OST) Uma Musume - GII Race (prototype ver)", artist: "A dumb horse", duration: "2:38" },
    { id: "qPtB_uva7z0", title: "(Game OST) Uma Musume - GIII Race (prototype ver)", artist: "A dumb horse", duration: "6:06" },
    { id: "7101tcwabM0", title: "Uma Musume - All Race Winning Lives (1st anniversary)", artist: "A dumb horse", duration: "25:12" },
    { id: "K54M6sMR8_8", title: "(Game OST) Uma Musume - Mock Race (Training prototype)", artist: "A dumb horse", duration: "1:34" },
    { id: "eYg1XDWT25Y", title: "(Game OST) Uma Musume - Fanfare Sapporo/Hakodate graded", artist: "A dumb horse", duration: "0:24" },
    { id: "LUc-9VQ1cTA", title: "(Game OST) Uma Musume - Fanfare Fukushima/Niigata graded", artist: "A dumb horse", duration: "0:23" },
    { id: "_oSypZj8HDE", title: "(Game OST) Uma Musume - Fanfare Chukyo/Kokura graded", artist: "A dumb horse", duration: "0:22" },
    { id: "sq1jZ9XmE-Q", title: "(Game OST) Uma Musume - Fanfare Tokyo/Nakayama G1", artist: "A dumb horse", duration: "0:27" },
    { id: "KFSCzAEJXvM", title: "(Game OST) Uma Musume - Fanfare Takarazuka Kinen", artist: "A dumb horse", duration: "0:32" },
    { id: "bVir9ssyn5k", title: "(Game OST) Uma Musume - Fanfare Kyoto/Hanshin G1", artist: "A dumb horse", duration: "0:26" },
    { id: "HRMhxK5Mv-s", title: "(Game OST) Uma Musume - Character Gacha (prototype)", artist: "A dumb horse", duration: "3:58" },
    { id: "nPY0IDnlMFU", title: "(Game OST) Uma Musume - Ms. VICTORIA (off-vocal)", artist: "A dumb horse", duration: "2:50" },
    { id: "mGi7dD3MmHw", title: "(Game OST) Uma Musume - Omoiyori, omoikake - BGM 01", artist: "A dumb horse", duration: "4:14" },
    { id: "zdRc2gffVR0", title: "(Game OST) Uma Musume - Omoiyori, omoikake - BGM 02", artist: "A dumb horse", duration: "4:26" },
    { id: "KkDzoMKsj_Y", title: "(Game OST) Uma Musume - Omoiyori, omoikake - BGM 03", artist: "A dumb horse", duration: "3:02" },
    { id: "c2adMsI6WZg", title: "(Game OST) Uma Musume - Omoiyori, omoikake - BGM 04", artist: "A dumb horse", duration: "7:06" },
    { id: "K8DQ1OX0eUY", title: "(Game OST) Uma Musume - Omoiyori, omoikake - BGM 05", artist: "A dumb horse", duration: "3:32" },
    { id: "ZAm9taWdNy8", title: "(Game OST) Uma Musume - Illuminate The Heart - BGM 01", artist: "A dumb horse", duration: "5:24" },
    { id: "z1MUvkBBtQ4", title: "(Game OST) Uma Musume - Illuminate The Heart - BGM 02", artist: "A dumb horse", duration: "4:34" },
    { id: "xv4RXrNV5Rk", title: "(Game OST) Uma Musume -Arima Kinen/Japan Derby last spurt (new arrange)", artist: "A dumb horse", duration: "1:07" },
    { id: "13VK-tM2Fjw", title: "(Game OST) Uma Musume - Kirari Magic Show", artist: "A dumb horse", duration: "3:19" },
    { id: "jhRvYVThYzE", title: "Uma Musume 4K MV - Kirari Magic Show", artist: "A dumb horse", duration: "2:44" },
    { id: "E1V-XHGRnnI", title: "(Game OST) Uma Musume - Happy New Future - BGM 01", artist: "A dumb horse", duration: "4:09" },
    { id: "1n-L-HwVdwA", title: "(Game OST) Uma Musume - Happy New Future - BGM 02", artist: "A dumb horse", duration: "7:04" },
    { id: "LP6N6bz_qvA", title: "(Game OST) Uma Musume - Happy New Future - BGM 03", artist: "A dumb horse", duration: "5:46" },
    { id: "2od_EQ6QnrI", title: "(Game OST) Uma Musume - Happy New Future - BGM 04", artist: "A dumb horse", duration: "5:22" },
    { id: "0cFD52voEKo", title: "(Game OST) Uma Musume - Happy New Future - BGM 05", artist: "A dumb horse", duration: "4:21" },
    { id: "MSi4B1B7FF8", title: "(Game OST) Uma Musume - Kirari Magic Show (off-vocal)", artist: "A dumb horse", duration: "2:57" },
    { id: "zyOtjG5gFlc", title: "(Game OST) Uma Musume - All Race Themes (2nd Anniversary)", artist: "A dumb horse", duration: "96:32" },
    { id: "DcgId6dGLDw", title: "(Game OST) Uma Musume - Sweet Memory Tea Time - BGM 01", artist: "A dumb horse", duration: "3:10" },
    { id: "PaY-UpvVq2E", title: "(Game OST) Uma Musume - Sweet Memory Tea Time - BGM 02", artist: "A dumb horse", duration: "7:10" },
    { id: "6T2cgzSbTyg", title: "(Game OST) Uma Musume - Sweet Memory Tea Time - BGM 03", artist: "A dumb horse", duration: "5:48" },
    { id: "kaZUcedjNMw", title: "(Game OST) Uma Musume - Sweet Memory Tea Time - BGM 04", artist: "A dumb horse", duration: "4:43" },
    { id: "cB-MacO2EaI", title: "(Game OST) Uma Musume - Sweet Memory Tea Time - BGM 05", artist: "A dumb horse", duration: "4:39" },
    { id: "f91k5HN9UT0", title: "(Game OST) Uma Musume - Paddock (Breeders Cup)", artist: "A dumb horse", duration: "4:18" },
    { id: "ATVaT8aQJkY", title: "(Game OST) Uma Musume - Paddock (Grand Masters)", artist: "A dumb horse", duration: "2:20" },
    { id: "j2zSEczqwy0", title: "(Game OST) Uma Musume - Glorious Moment (off-vocal)", artist: "A dumb horse", duration: "2:07" },
    { id: "hhO5hSN7rT0", title: "Uma Musume MV - Glorious Moment!", artist: "A dumb horse", duration: "2:03" },
    { id: "rA_XlURgphY", title: "Uma Musume MV - Tracen Ondo", artist: "A dumb horse", duration: "2:26" },
    { id: "72GrlzFYyqM", title: "(Game OST) Uma Musume - Tracen Ondo (off-vocal)", artist: "A dumb horse", duration: "2:28" },
    { id: "hOlqeiHKtLg", title: "(Game OST) Uma Musume - Prix de l'Arc de Triomphe race + last spurt", artist: "A dumb horse", duration: "3:47" },
    { id: "daammC3hy7Y", title: "(Game OST) Uma Musume - Paddock France (Graded races)", artist: "A dumb horse", duration: "2:00" },
    { id: "OIcjl23ntsY", title: "(Game OST) Uma Musume - L'arc Trial Race + last spurt", artist: "A dumb horse", duration: "4:42" },
    { id: "M0YGSsPu0WQ", title: "(Game OST) Uma Musume - Project L'arc - Training 1", artist: "A dumb horse", duration: "5:08" },
    { id: "ktogGVzYZXo", title: "(Game OST) Uma Musume - Project L'arc - Training 2", artist: "A dumb horse", duration: "4:11" },
    { id: "Ccz6XmtAHi8", title: "(Game OST) Uma Musume - Project L'arc - Training France", artist: "A dumb horse", duration: "3:24" },
    { id: "5DLujs8bu_I", title: "(Game OST) Uma Musume - Masters Challenge race + last spurt", artist: "A dumb horse", duration: "4:44" },
    { id: "b320xuoIJ8I", title: "Uma Musume MV - Soshite Minna No", artist: "A dumb horse", duration: "2:27" },
    { id: "2jEixOHMtjU", title: "Uma Musume MV - U.M.A. New World", artist: "A dumb horse", duration: "2:38" },
    { id: "7wRb9FH-iiU", title: "(Game OST) Uma Musume - U.M.A. New World (off-vocal)", artist: "A dumb horse", duration: "2:38" },
    { id: "i7ocJ3PKwxE", title: "(Game OST) Uma Musume - Umamusume Athletic Festival - Training 1", artist: "A dumb horse", duration: "5:24" },
    { id: "DERvidI8qZw", title: "(Game OST) Uma Musume - Umamusume Athletic Festival - Training 2", artist: "A dumb horse", duration: "5:23" },
    { id: "wb3C5johTj0", title: "(Game OST) Uma Musume - Daihoshokusai - Training 1", artist: "A dumb horse", duration: "4:44" },
    { id: "QZ07Q5chzQE", title: "(Game OST) Uma Musume - Daihoshokusai - Training 2", artist: "A dumb horse", duration: "4:32" },
    { id: "f7oYc2F8_X0", title: "Uma Musume Ver.2 MV - UMA Summer", artist: "A dumb horse", duration: "2:25" },
    { id: "jMG2uyEtm7o", title: "(Game OST) Uma Musume - Run Mecha Umamusume - Training 1", artist: "A dumb horse", duration: "4:25" },
    { id: "xX1I-oUyz_I", title: "(Game OST) Uma Musume - Run Mecha Umamusume - Training 2", artist: "A dumb horse", duration: "5:05" },
    { id: "kdyRQAppNTY", title: "Uma Musume Ver.2 MV - Starting Force", artist: "A dumb horse", duration: "2:16" },
    { id: "-7VEA0Blp44", title: "Uma Musume Ver.2 MV - Legend-Changer", artist: "A dumb horse", duration: "2:34" },
    { id: "nNC5oVXtq0c", title: "(Game OST) Uma Musume - Legend-Changer (off-vocal)", artist: "A dumb horse", duration: "2:35" },
    { id: "z5BqgfTG4GA", title: "(Game OST) Uma Musume - Dream Fest Stella/Pride race + last spurt", artist: "A dumb horse", duration: "6:07" },
    { id: "dVBoXBE0KtU", title: "(Game OST) Uma Musume - Dream Fest Legend race + last spurt", artist: "A dumb horse", duration: "5:10" },
    { id: "DO4yoBITo3Y", title: "(Game OST) Uma Musume - The Twinkle Legends - Training 1", artist: "A dumb horse", duration: "5:02" },
    { id: "mc-y-WSOZmk", title: "(Game OST) Uma Musume - The Twinkle Legends - Training 2", artist: "A dumb horse", duration: "5:33" },
    { id: "_U4knrmbWS4", title: "(Game OST) Uma Musume - Welcome to the Deserted Island - Training 1", artist: "A dumb horse", duration: "3:33" },
    { id: "QzjZglj0QJM", title: "(Game OST) Uma Musume - Welcome to the Deserted Island - Training 2", artist: "A dumb horse", duration: "4:35" },
    { id: "GMfHetlwlWo", title: "(Game OST) Uma Musume - Welcome to the Deserted Island - Summer training", artist: "A dumb horse", duration: "2:56" },
    { id: "NzScTnQCZ88", title: "Uma Musume Ver.2 MV - Gift (story version)", artist: "A dumb horse", duration: "2:57" },
    { id: "Ww4EcZSAmKk", title: "(Game OST) Uma Musume - Road To The Top BGM", artist: "A dumb horse", duration: "4:17" },
    { id: "V1Tjaxf-g5E", title: "(Game OST) Uma Musume - Tucker's Skill-up Island (off-vocal)", artist: "A dumb horse", duration: "2:12" },
    { id: "rN-l3FlpJO0", title: "(Game OST) Uma Musume - L'Arc de Gloire (off-vocal)", artist: "A dumb horse", duration: "2:27" },
    { id: "HJADvzgfbPI", title: "(Game OST) Uma Musume - Bakunetsu my Soul (off-vocal)", artist: "A dumb horse", duration: "2:15" },
    { id: "-DBrBIjmIdA", title: "(Game OST) Uma Musume - Starting Force (off-vocal)", artist: "A dumb horse", duration: "2:16" },
    { id: "wmwcfMC6mvU", title: "(Game OST) Uma Musume - League of Heroes race + last spurt", artist: "A dumb horse", duration: "5:41" },
    { id: "lxwval1iFCI", title: "(Game OST) Uma Musume - O-rorize (off-vocal)", artist: "A dumb horse", duration: "2:07" },
    { id: "xe_wiwz9hUA", title: "(Game OST) Uma Musume - Umasugi Gourmet Parade (off-vocal)", artist: "A dumb horse", duration: "2:29" },
    { id: "dYhDfjcsT1M", title: "(Game OST) Uma Musume - Umatube Channel challenge", artist: "A dumb horse", duration: "3:18" },
    { id: "A4pNcoBGJ0A", title: "(Game OST) Uma Musume - Aoharu Cup (Unity Cup) Pre-season race + last spurt", artist: "A dumb horse", duration: "7:37" },
    { id: "9wOZdz83B1Y", title: "(Game OST) Uma Musume - Aoharu Cup (Unity Cup) Final race + last spurt", artist: "A dumb horse", duration: "6:15" },
    { id: "YiyX1tHqxGA", title: "Uma Musume Ver.2 MV - Many-shuki♡Rush-shu", artist: "A dumb horse", duration: "2:47" },
    { id: "5GKtEZO5ZcA", title: "(Game OST) Uma Musume - Many-shuki♡Rush-shu (off-vocal)", artist: "A dumb horse", duration: "2:47" },
    { id: "KGl5zikGobw", title: "(Game OST) Uma Musume - League of Heroes Extra race + last spurt", artist: "A dumb horse", duration: "6:02" },
    { id: "5tHKBFMAoGY", title: "(Game OST) Uma Musume - Tenno Sho Spring (Story mode)", artist: "A dumb horse", duration: "2:42" },
    { id: "cS-y2VdFCPw", title: "(Game OST) Uma Musume - Story BGM 5", artist: "A dumb horse", duration: "12:12" },
    { id: "pZRvQust_kg", title: "(Game OST) Uma Musume - Gift (off-vocal)", artist: "A dumb horse", duration: "3:05" },
    { id: "SVlQ8NbziRY", title: "(Game OST) Uma Musume - Fanfare for Future (instrumental)", artist: "A dumb horse", duration: "8:09" },
    { id: "55PtQJEr-Rs", title: "(Game OST) Uma Musume - Yukoma Onsen Village - Training 1", artist: "A dumb horse", duration: "4:47" },
    { id: "9cvSgc3O_f0", title: "(Game OST) Uma Musume - Yukoma Onsen Village - Training 2", artist: "A dumb horse", duration: "4:20" },
    { id: "c01rnXVazQ0", title: "(Game OST) Uma Musume - Yukoma Roman Junjoha (off-vocal)", artist: "A dumb horse", duration: "2:39" },
    { id: "0-pCceUGSrg", title: "(Game OST) Uma Musume - Soshite Minna No (off-vocal)", artist: "A dumb horse", duration: "2:27" },
    { id: "7mncMJNW5rc", title: "Uma Musume Ver.2 MV - Yukoma Roman Junjoha", artist: "A dumb horse", duration: "2:38" },
    { id: "cxmBr2ptgdo", title: "Uma Musume Ver.2 MV - Tucker's Skill-Up Island", artist: "A dumb horse", duration: "2:13" },
    { id: "9-AS4vPX8nI", title: "Uma Musume Ver.2 MV - Bakunetsu My Soul", artist: "A dumb horse", duration: "2:16" },
    { id: "UADgw4AfKns", title: "(Game OST) Uma Musume - Masters Challenge race 2 + last spurt", artist: "A dumb horse", duration: "4:39" },
    { id: "Gpydi-CLUwQ", title: "Uma Musume Ver.2 MV - Hello, Polaris", artist: "A dumb horse", duration: "1:56" },
    { id: "aeCUglBhlhk", title: "(Game OST) Uma Musume - A Small Wish (off-vocal)", artist: "A dumb horse", duration: "2:16" },
    { id: "ld0MBvBty5M", title: "(Game OST) Uma Musume - Everlasting Beats (off-vocal)", artist: "A dumb horse", duration: "2:24" },
    { id: "_1L7M9SDX3k", title: "(Game OST) Uma Musume - Those Tears are for the Tomorrow (off-vocal)", artist: "A dumb horse", duration: "2:25" },
    { id: "qYBv1M1hxB0", title: "(Game OST) Uma Musume - Overrunner (off-vocal)", artist: "A dumb horse", duration: "2:33" },
    { id: "frPuDgZAnro", title: "(Game OST) Uma Musume - Yume wo Kakeru (off-vocal)", artist: "A dumb horse", duration: "2:39" },
    { id: "hY6wVG9B4bo", title: "(Game OST) Uma Musume - Dramatic Journey (off-vocal)", artist: "A dumb horse", duration: "2:52" },
    { id: "U_S2PbLJLv8", title: "Uma Musume Ver.2 MV - VOLTAGE", artist: "A dumb horse", duration: "2:35" },
    { id: "ZkgZXeLqfHc", title: "(Game OST) Uma Musume - Breeders Cup race + last spurt", artist: "A dumb horse", duration: "5:03" },
    { id: "VK6LiFmwAUo", title: "(Game OST) Uma Musume - Beyond Dreams - Training 1", artist: "A dumb horse", duration: "4:34" },
    { id: "i9IQFTxRnEw", title: "(Game OST) Uma Musume - Beyond Dreams - Training 2", artist: "A dumb horse", duration: "4:34" },
    { id: "s8BRiiqMcro", title: "(Game OST) Uma Musume - Breeders Cup - Paddock", artist: "A dumb horse", duration: "1:36" },
    { id: "SonJGaRzO-E", title: "(Game OST) Uma Musume - Breeders Cup - Entry List", artist: "A dumb horse", duration: "1:35" },
    { id: "LGxkpRHlP-c", title: "Uma Musume Ver.2 MV - UMA IN AMERICA", artist: "A dumb horse", duration: "2:31" },
    { id: "QEiNLBo4nx0", title: "(Game OST) Uma Musume - UMA IN AMERICA (off-vocal)", artist: "A dumb horse", duration: "2:31" },
    { id: "CMU5f-3HjHY", title: "(Game OST) Uma Musume - Beyond Dreams - Team Evaluation", artist: "A dumb horse", duration: "3:16" },
    { id: "s11OSfouzY4", title: "(Game OST) Uma Musume - Run Mecha Umamusume - Tuning", artist: "A dumb horse", duration: "2:47" },
    { id: "Iq2Sy_5oBiI", title: "(Game OST) Uma Musume - Story BGM 6 (Many-suki Rush-shu)", artist: "A dumb horse", duration: "3:11" },
    { id: "8dN-aMIqTkA", title: "(Game OST) Uma Musume - Trainer Planner", artist: "A dumb horse", duration: "4:11" },
    { id: "zuh8KIcs6CM", title: "(Game OST) Uma Musume - All Fanfares (Original and JRA)", artist: "A dumb horse", duration: "22:44" },
    { id: "m2ZYChFDpy0", title: "(Game OST) Uma Musume - UMA Summer (off-vocal)", artist: "A dumb horse", duration: "2:24" },
    { id: "Vbaom9LITPc", title: "(Game OST) Uma Musume - Masters Challenge race 3 + last spurt", artist: "A dumb horse", duration: "2:53" },
    { id: "_ieSPC1zr_M", title: "(Game OST) Uma Musume - VOLTAGE (off-vocal)", artist: "A dumb horse", duration: "2:34" },
    { id: "q1md7CbDDPM", title: "[Private video]", artist: "Unknown", duration: "0:00" },
];


export default function JukeboxPage() {
    const [currentTrack, setCurrentTrack] = useState(OST_LIST[0]);
    const [playerError, setPlayerError] = useState(false);
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const apiReadyRef = useRef(false);

    // Load YT IFrame API script once
    useEffect(() => {
        if (window.YT && window.YT.Player) {
            apiReadyRef.current = true;
            return;
        }
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript?.parentNode?.insertBefore(tag, firstScript);

        window.onYouTubeIframeAPIReady = () => {
            apiReadyRef.current = true;
            // Trigger initial player creation
            createPlayer(currentTrack.id);
        };
        return () => { window.onYouTubeIframeAPIReady = undefined; };
    }, []);

    const createPlayer = useCallback((videoId: string) => {
        if (!apiReadyRef.current || !containerRef.current) return;
        // Destroy previous player
        if (playerRef.current) {
            try { playerRef.current.destroy(); } catch (_) {}
            playerRef.current = null;
        }
        setPlayerError(false);
        try {
            playerRef.current = new window.YT.Player(containerRef.current, {
                videoId,
                width: '100%',
                height: '100%',
                playerVars: {
                    rel: 0,
                    modestbranding: 1,
                    playsinline: 1,
                },
                events: {
                    onError: () => setPlayerError(true),
                },
            });
        } catch (_) {
            setPlayerError(true);
        }
    }, []);

    // When track changes, reload player
    useEffect(() => {
        if (apiReadyRef.current) {
            createPlayer(currentTrack.id);
        }
    }, [currentTrack.id, createPlayer]);

    // Also try creating player on mount if API was already loaded
    useEffect(() => {
        const interval = setInterval(() => {
            if (apiReadyRef.current && !playerRef.current) {
                createPlayer(currentTrack.id);
                clearInterval(interval);
            }
        }, 300);
        return () => clearInterval(interval);
    }, []);

    const openInBrowser = () => {
        const url = `https://www.youtube.com/watch?v=${currentTrack.id}`;
        try {
            if (window.pywebview?.api?.open_url) {
                window.pywebview.api.open_url(url);
            } else {
                window.open(url, '_blank');
            }
        } catch (_) {
            window.open(url, '_blank');
        }
    };

    return (
        <div className="settings-page" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <h2 style={{ marginBottom: "5px", fontSize: "24px", color: "var(--text-primary)", fontWeight: 700 }}>Jukebox</h2>
            <p className="subtitle">Enjoy your favorite Uma Musume OSTs while macroing!</p>

            <div style={{
                display: "flex",
                flexWrap: "wrap",
                flex: 1,
                gap: "20px",
                marginTop: "10px",
                overflowY: "auto",
                overflowX: "hidden",
                paddingBottom: "20px"
            }}>
                {/* Left side: Player */}
                <div style={{
                    flex: "1 1 450px",
                    alignSelf: "flex-start",
                    background: "var(--bg-card)",
                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}>
                    <div style={{
                        width: "100%",
                        aspectRatio: "16 / 9",
                        flexShrink: 0,
                        background: "#000",
                        position: "relative"
                    }}>
                        <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
                        {playerError && (
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                background: "rgba(0,0,0,0.85)",
                                gap: "12px",
                                zIndex: 2
                            }}>
                                <span style={{ color: "#aaa", fontSize: "14px" }}>Playback unavailable in-app</span>
                                <button onClick={openInBrowser} style={{
                                    padding: "8px 20px",
                                    background: "var(--accent)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    fontFamily: "inherit"
                                }}>▶ Open in Browser</button>
                            </div>
                        )}
                    </div>
                    <div style={{ padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <h3 style={{ margin: "0 0 5px 0", color: "var(--text-primary)", fontSize: "20px" }}>{currentTrack.title}</h3>
                            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "14px" }}>{currentTrack.artist}</p>
                        </div>
                        <button onClick={openInBrowser} style={{
                            padding: "6px 14px",
                            background: "transparent",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border)",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "11px",
                            fontFamily: "inherit",
                            flexShrink: 0,
                            transition: "all 0.15s"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent-text)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
                        >Open in Browser</button>
                    </div>
                </div>

                {/* Right side: Playlist */}
                <div style={{
                    flex: "1 1 300px",
                    minHeight: "400px",
                    background: "var(--bg-card)",
                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
                }}>
                    <div style={{
                        padding: "15px",
                        borderBottom: "1px solid var(--border)",
                        background: "rgba(0,0,0,0.02)",
                        fontWeight: 600,
                        color: "var(--text-primary)"
                    }}>
                        Playlist
                    </div>
                    <div style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "10px"
                    }}>
                        {OST_LIST.map((track, i) => (
                            <div
                                key={track.id}
                                onClick={() => setCurrentTrack(track)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    padding: "10px",
                                    borderRadius: "var(--radius-md)",
                                    cursor: "pointer",
                                    background: currentTrack.id === track.id ? "var(--bg-card-hover)" : "transparent",
                                    border: currentTrack.id === track.id ? "1px solid var(--accent)" : "1px solid transparent",
                                    transition: "all 0.2s ease",
                                    marginBottom: "5px"
                                }}
                                onMouseEnter={(e) => {
                                    if (currentTrack.id !== track.id) {
                                        e.currentTarget.style.background = "var(--bg-card-hover)";
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (currentTrack.id !== track.id) {
                                        e.currentTarget.style.background = "transparent";
                                    }
                                }}
                            >
                                <div style={{
                                    width: "30px",
                                    textAlign: "center",
                                    color: currentTrack.id === track.id ? "var(--accent)" : "var(--text-muted)",
                                    fontSize: "14px",
                                    fontWeight: 600
                                }}>
                                    {currentTrack.id === track.id ? "▶" : (i + 1)}
                                </div>
                                <div style={{ flex: 1, overflow: "hidden" }}>
                                    <div style={{
                                        color: currentTrack.id === track.id ? "var(--accent)" : "var(--text-primary)",
                                        fontWeight: 500,
                                        fontSize: "13px",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>
                                        {track.title}
                                    </div>
                                    <div style={{
                                        color: "var(--text-secondary)",
                                        fontSize: "11px",
                                        marginTop: "2px"
                                    }}>
                                        {track.duration}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
