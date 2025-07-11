/* eslint-disable no-useless-escape */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect } from 'react'

import { NextPage } from 'next'

import { Container } from 'components/common/wrappers/container'
import { initPrismOnSDKPage } from 'utils/prism/init'

const UnitySDKPage: NextPage = () => {
    useEffect(() => {
        initPrismOnSDKPage()
    }, [])

    return (
        <Container>
            <div className="mx-auto max-w-4xl">
                <div>
                    <div>
                        <div id="doc-header" className="doc-header text-center">
                            <h1 className="text-4xl text-link">Getting Started</h1>
                            <div className="text-base-300">Last updated: Oct 18th, 2023</div>
                        </div>

                        <div>
                            <div>
                                <div>
                                    <section id="introduction-section" className="mb-8">
                                        <h2 className="mb-2 text-2xl font-bold">Introduction</h2>
                                        <hr className="mb-2" />
                                        <div className="section-block">
                                            <p>
                                                <strong>ArenaGamesSDK</strong> is a user-friendly
                                                drag-and-drop solution that enables developers to
                                                effortlessly harness the capabilities of ArenaGames
                                                and Web3. It serves as a dedicated custom wrapper
                                                for our API, simplifying integration.
                                            </p>
                                            <br />
                                            <h4 className="mb-2 text-lg font-bold">Features:</h4>

                                            <ul className="list-inside list-disc space-y-2">
                                                <li>Drag and drop solution.</li>
                                                <li>Account System</li>
                                                <li>Leaderboards</li>
                                                <li>Achievements</li>
                                                <li>NFT Tracking (Work in Progress)</li>
                                            </ul>
                                        </div>
                                    </section>

                                    <section id="settingup-section" className="doc-section">
                                        <h2 className="mb-2 text-2xl font-bold">Setting Up</h2>
                                        <hr className="mb-2" />
                                        <div id="importing_package" className="mb-8">
                                            <h4 className="mb-2 text-lg font-bold">
                                                Importing the package
                                            </h4>
                                            <p className="mb-2">
                                                Now that you have downloaded your shiny new package,
                                                feel free to go ahead and import it into your
                                                project.
                                            </p>

                                            <p className="mb-2">
                                                After a successful import, it`s crucial to set up
                                                the configuration file correctly. Locate the
                                                configuration file by clicking on `Window` {'>'}{' '}
                                                `Arena Games` {'>'} `Highlight ArenaGames settings`
                                                (as shown below).
                                            </p>
                                            <p>
                                                <img src="/images/unitysdk/highlight_settings.png" />
                                            </p>
                                        </div>

                                        <div id="configuring_options" className="mb-8">
                                            <h4 className="mb-2 text-lg font-bold">
                                                Configuring Options
                                            </h4>
                                            <p className="mb-4">
                                                After locating the configuration file, please
                                                configure it correctly. Necessary information will
                                                be provided by ArenaGames
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2">
                                                <div className="col-span-1">
                                                    <ul className="list-inside list-disc space-y-1">
                                                        <li>
                                                            <b>Game Name</b> - Full name of your
                                                            game.
                                                        </li>
                                                        <li>
                                                            <b>Game Alias</b> - A special identifier
                                                            of your game (will be provided by
                                                            ArenaGames).
                                                        </li>
                                                        <li>
                                                            <b>Leaderboard Id</b> - A special
                                                            identifier of your game leaderboards
                                                            (will be provided by ArenaGames).
                                                        </li>
                                                        <li>
                                                            <b>Server Token</b> - A special token
                                                            for authentication purposes (will be
                                                            provided by ArenaGames).
                                                        </li>
                                                        <li>
                                                            <b>IsProd</b> - This checkmark, toggles
                                                            between a DEV and Live environments. On
                                                            - Live, Off - DEV.
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-span-1">
                                                    <p>
                                                        <img src="/images/unitysdk/arenagames_settings.png" />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="adding_prefab" className="mb-8">
                                            <h4 className="mb-2 text-lg font-bold">
                                                Adding Prefab
                                            </h4>
                                            <p className="mb-2">
                                                After successfully configuring your settings,
                                                navigate to `ArenaGames {'>'} Prefabs` folder.
                                                You`ll find several prefabs designed for both
                                                horizontal and vertical screens. Select the one that
                                                best suits your game and drag-and-drop it into your
                                                initial scene.
                                            </p>
                                            <p>
                                                <img src="/images/unitysdk/arenagames_prefabs.png" />
                                            </p>
                                        </div>

                                        <div id="init_sdk" className="mb-8">
                                            <h4 className="mb-2 text-lg font-bold">
                                                Initializing ArenaGames SDK
                                            </h4>
                                            <p>
                                                To initialize ArenaGames, you need to prompt a
                                                signin, the rest will be handled by the SDK. Here is
                                                an example:
                                            </p>
                                            <p className="overflow-x-auto">
                                                <pre className="line-numbers" data-line="7">
                                                    <code className="language-csharp">
                                                        {`using UnityEngine;

public class DemoController : MonoBehaviour
  {
    void Start()
      {
        ArenaGamesController.Instance.StartSignInProcess();
      }
}`}
                                                    </code>
                                                </pre>
                                            </p>
                                        </div>
                                    </section>

                                    <section id="leaderboards-section" className="mb-8">
                                        <h2 className="mb-2 text-2xl font-bold">Leaderboards</h2>
                                        <hr className="mb-2" />
                                        <div id="posting_score" className="section-block">
                                            <h4 className="mb-2 text-lg font-bold">
                                                Posting a score
                                            </h4>
                                            <p className="overflow-x-auto">
                                                <pre className="line-numbers" data-line="8">
                                                    <code className="language-csharp">
                                                        {`using UnityEngine;

public class DemoController : MonoBehaviour
{
  public void PostToLeaderboard()
    {
        int _Score = 10;
        ArenaGamesController.Instance.m_NetworkController.UpdateToLeaderboard(_Score);
    }
}`}
                                                    </code>
                                                </pre>
                                            </p>
                                        </div>
                                    </section>

                                    <section id="achievements-section" className="mb-8">
                                        <h2 className="mb-2 text-2xl font-bold">Achievements</h2>
                                        <hr className="mb-2" />
                                        <div id="updating_achievement" className="mb-4">
                                            <h4 className="mb-2 text-lg font-bold">
                                                Updating achievement progress
                                            </h4>
                                            <p className="mb-2">
                                                You can create achievements on the ArenaGames
                                                dashboard. Essentially, these achievements act like
                                                variables that can be increased. Each achievement
                                                has a condition for completion. Let`s take an
                                                example achievement: `Kill 10 enemies.` It will be
                                                completed once its value reaches 10. The following
                                                script increments this achievement by one.
                                                Achievement IDs are provided from the ArenaGames
                                                dashboard.
                                            </p>
                                            <p className="overflow-x-auto">
                                                <pre className="line-numbers" data-line="9">
                                                    <code className="language-csharp">
                                                        {`using UnityEngine;

public class DemoController : MonoBehaviour
{
  private void Start()
    {
      string _AchievementId = "Achievement_Kill_10";
      int _IncrementAmount = 1;
          ArenaGamesController.Instance.m_NetworkController.ProgressAchievement(_AchievementId, _IncrementAmount);
    }
}`}
                                                    </code>
                                                </pre>
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default UnitySDKPage
