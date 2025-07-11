import { FC } from 'react'

import Head from 'next/head'

import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'

interface IPrivacyProps {}

const Privacy: FC<IPrivacyProps> = () => {
    return (
        <>
            <Head>
                <title>Privacy</title>
            </Head>
            <PageWrapper>
                <Container>
                    <body className="space-y-3">
                        <p>
                            Privacy policy - Last updated June, 17th 2020
                            <br />
                            Sambrela is an international entertainment company specialized in the
                            mobile environment. We create and publish free mobile games and
                            applications that aim to entertain, inform and connect people by
                            leveraging global creative power.
                        </p>

                        <p>
                            The purpose of this policy is to provide you with all the important
                            information and explanations about how and why some of your data may be
                            collected and processed by Sambrela when you use one of our applications
                            or browse on our website. This privacy policy governs and details the
                            main principles that Sambrela applies to the data we collect and process
                            to:
                        </p>

                        <ol className="pl-2">
                            <li>
                                1. develop and publish mobile apps (&ldquo;Sambrela Apps and
                                Games&rdquo;),
                            </li>
                            <li>
                                2. serve advertising that are tailored to the interests of users
                                (&ldquo;Sambrela Ads&rdquo;) and
                            </li>
                            <li>3. run our corporate website (&ldquo;Sambrela.com&rdquo;).</li>
                        </ol>

                        <p>
                            This policy also aims to remind you about your rights and to provide you
                            with all the elements you need to exercise them.
                        </p>

                        <p>
                            Should you have any questions related to this policy or our practices
                            around privacy and data protection in general, please don&rsquo;t
                            hesitate to contact Sambrela Data Protection Officer as indicated in the
                            contact section of this policy.&nbsp;
                        </p>

                        <p>
                            Sambrela apps and games
                            <br />
                            Why does Sambrela collect data from its apps and games?
                            <br />
                            When you install and use Sambrela mobile applications, we can collect
                            and process some of your data for different legitimate purposes.
                        </p>

                        <p>
                            You will find below explanations regarding the reasons why Sambrela may
                            collect data and the legal bases Sambrela relies on in each case.&nbsp;
                        </p>

                        <p>Sambrela collects data:&nbsp;</p>

                        <p>To provide you with the services you asked for</p>

                        <p>
                            (e.g., knowing that you completed the first level to allow access to the
                            second one)
                        </p>

                        <p>
                            Legal basis &ndash; such data processing is strictly necessary for the
                            service(s) asked
                        </p>

                        <p>
                            To run analytics and understand how users interact with our product and
                            services in order to continuously improve it
                        </p>

                        <p>
                            (e.g. identifying that a feature is annoying for users or that a level
                            is too difficult for most gamers)
                        </p>

                        <p>
                            Legal basis - Express consent. Sambrela only processes or shares
                            personal data collected through Sambrela apps for analytics purposes
                            once you express your consent through the pop-up notice included in our
                            apps.
                        </p>

                        <p>
                            To serve advertising tailored to the preference and interests of our
                            users
                        </p>

                        <p>and allow Sambrela to continue to provide free services and products</p>

                        <p>
                            Legal basis &ndash; Express consent. Sambrela only processes or shares
                            personal data collected through Sambrela apps for personalized
                            advertising purposes once you express your consent through the pop-up
                            notice included in one of our apps.
                        </p>

                        <p>
                            For all data processing activities that rely on users&rsquo; consent,
                            you can withdraw your consent at any time from the
                            &ldquo;settings&rdquo; page in our various applications.
                        </p>

                        <p>
                            Please only note that in the case where you withdraw your consent or
                            where you refuse to consent in the first place, you will still be served
                            with advertising but that may be less relevant to you as it will not be
                            tailored to your interests.
                        </p>

                        <p>
                            What data does Sambrela collect from its apps and games?
                            <br />
                            For all the purposes listed above the data that Sambrela collect is
                            limited to:
                        </p>

                        <p>The apps you are using</p>

                        <p>Your IP address</p>

                        <p>
                            Your Mobile Advertising ID (Apple IDFA or Google AAID - which are
                            technical identifiers developed by mobile operating systems for
                            advertising purposes which remain under your control and can be reset or
                            erased at any time in through your device settings)
                        </p>

                        <p>
                            Technical information about the device you use and your connection (user
                            agent, type of connection, timestamp)
                        </p>

                        <p>
                            Data pertaining to your activities on our applications and notably the
                            way in which you interact with our applications (for instance, how and
                            when you use our applications) and with the advertising served in our
                            applications (for instance, number of ads served, potential clicks)
                        </p>

                        <p>
                            With who may your data be shared &amp; why?
                            <br />
                            Sambrela does not share your personal data with third parties without
                            your prior consent.&nbsp;
                        </p>

                        <p>
                            When you consent to the collection of data for advertising and analytics
                            purpose, we may share the data listed above with the following
                            categories of recipients:
                        </p>

                        <p>
                            Ad Partners: that allow us to monetize the ad inventory of our apps and
                            provide users with free products and services.
                        </p>

                        <p>
                            Those partners usually collect data via their own tools (Software
                            Development Kits or &ldquo;SDK&rdquo;). You will find a list of our
                            partners implementing advertising SDKs through our applications and the
                            privacy policies of their services that describe their practices and
                            allow you to exercise your rights directly toward them hereafter:
                        </p>

                        <p>
                            Adcolony -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.adcolony.com/privacy-policy/"
                            >
                                https://www.adcolony.com/privacy-policy/
                            </a>
                        </p>

                        <p>
                            Applovin -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.applovin.com/privacy/"
                            >
                                https://www.applovin.com/privacy/
                            </a>
                        </p>

                        <p>
                            Criteo -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.criteo.com/privacy/"
                            >
                                https://www.criteo.com/privacy/
                            </a>
                        </p>

                        <p>
                            Facebook -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.facebook.com/about/privacy"
                            >
                                https://www.facebook.com/about/privacy
                            </a>
                            <br />
                            Fyber -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.fyber.com/privacy-policy/"
                            >
                                https://www.fyber.com/privacy-policy/
                            </a>
                        </p>

                        <p>
                            Google -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://policies.google.com/privacy"
                            >
                                https://policies.google.com/privacy
                            </a>
                        </p>

                        <p>
                            Inmobi -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.inmobi.com/privacy-policy/"
                            >
                                https://www.inmobi.com/privacy-policy/
                            </a>
                        </p>

                        <p>
                            Ironsource -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://developers.ironsrc.com/ironsource-mobile/air/ironsource-mobile-privacy-policy/"
                            >
                                https://developers.ironsrc.com/ironsource-mobile/air/ironsource-mobile-privacy-policy/
                            </a>
                        </p>

                        <p>
                            Mintegral -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.mintegral.com/en/privacy/"
                            >
                                https://www.mintegral.com/en/privacy/
                            </a>
                        </p>

                        <p>
                            Mopub -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.mopub.com/legal/privacy/"
                            >
                                https://www.mopub.com/legal/privacy/
                            </a>
                        </p>

                        <p>
                            Oath -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://policies.oath.com/in/en/oath/privacy/"
                            >
                                https://policies.oath.com/in/en/oath/privacy/
                            </a>
                        </p>

                        <p>
                            Ogury -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://ogury.com/privacy-policy/"
                            >
                                https://ogury.com/privacy-policy/
                            </a>
                        </p>

                        <p>
                            Tapjoy -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.tapjoy.com/legal/tapjoy-users/#privacy-policy"
                            >
                                https://www.tapjoy.com/legal/tapjoy-users/#privacy-policy
                            </a>
                        </p>

                        <p>
                            Vungle -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://vungle.com/privacy/"
                            >
                                https://vungle.com/privacy/
                            </a>
                        </p>

                        <p>
                            Analytic companies: that provide us with tools and technologies that
                            allow us to better understand how users interact with our services and
                            will help us improve it. Those partners also usually collect data via
                            their own SDKs. You will find a list of our partners implementing
                            analytical SDKs through our applications hereafter:
                        </p>

                        <p>
                            Adjust -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.adjust.com/terms/privacy-policy/"
                            >
                                https://www.adjust.com/terms/privacy-policy/
                            </a>
                        </p>

                        <p>
                            GameAnalytics -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://policies.google.com/privacy"
                            >
                                https://policies.google.com/privacy
                            </a>
                        </p>

                        <p>
                            Google -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://policies.google.com/privacy"
                            >
                                https://policies.google.com/privacy
                            </a>
                        </p>

                        <p>
                            Mixpanel -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://mixpanel.com/legal/privacy-policy/"
                            >
                                https://mixpanel.com/legal/privacy-policy/
                            </a>
                        </p>

                        <p>
                            Tenjin -<br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.tenjin.io/privacy/"
                            >
                                https://www.tenjin.io/privacy/
                            </a>
                        </p>

                        <p>
                            Authorities: only to the extent we are obliged to by applicable laws and
                            regulations.
                        </p>

                        <p>
                            Sambrela ads
                            <br />
                            Why does Sambrela collect data for advertising purposes?
                            <br />
                            Sambrela Ads services allow Sambrela and its publisher partners (most of
                            the time Sambrela Ads partners are third party mobile application
                            providers) to monetize advertising inventory by allowing advertisers to
                            serve personalized advertising to users.&nbsp;
                        </p>

                        <p>
                            In order to deliver such services for its clients and partners, Sambrela
                            can receive and process data for different legitimate purposes.&nbsp;
                        </p>

                        <p>
                            You will find below explanations regarding the reasons why Sambrela may
                            collect data and the legal bases it relies on in each case.&nbsp;
                        </p>

                        <p>To help our publisher partners monetize their ad inventory</p>

                        <p>
                            Just like Sambrela rely on advertising to provide free apps and games,
                            our partners can use Sambrela Ads services to monetize their ad
                            inventory.
                        </p>

                        <p>To help advertiser partners promote their products and services</p>

                        <p>
                            Sambrela ads services help advertisers promoting their products and
                            services to an audience that has demonstrated interests in similar
                            products and services and allow them to optimize their marketing spends.
                        </p>

                        <p>To improve Sambrela Ads services</p>

                        <p>
                            Sambrela is committed to constantly improve the services delivered to
                            its publishers and advertisers. In order to do so, Sambrela Ads
                            processes the data listed below in a way that notably allows us to
                            better understand how users interact with the ads of our advertiser
                            partners and optimize their user experience.
                        </p>

                        <p>
                            For all these purposes we contractually oblige our partners to collect
                            the express consent of their users before any data is sent to Sambrela
                            Ads.
                        </p>

                        <p>
                            What data does Sambrela collect for advertising purposes?
                            <br />
                            For all the purposes listed above the data that Sambrela collect is
                            limited to:
                        </p>

                        <p>The apps you are using</p>

                        <p>Your IP address</p>

                        <p>
                            Your Mobile Advertising ID (Apple IDFA or Google AAID - which are
                            technical identifiers developed by mobile operating systems for
                            advertising purposes which remain under your control and can be reset or
                            erased at any time in your device settings)
                        </p>

                        <p>
                            Technical information about the device you use and your connection (user
                            agent, type of connection, timestamp)
                        </p>

                        <p>
                            Data pertaining to your interactions with the advertisements served
                            (e.g., number of ads served, potential clicks)
                        </p>

                        <p>
                            With who is your data shared &amp; why?
                            <br />
                            Data collected for the purposes of our Sambrela Ads services are only
                            shared with the following categories of recipients and only to the
                            extent such data is necessary for the purpose they are following:&nbsp;
                        </p>

                        <p>
                            Advertisers that are using Sambrela Ads services to serve personalized
                            or non-personalized advertising.
                        </p>

                        <p>
                            Publishers that are using Sambrela Ads services to monetize their
                            advertising inventory.
                        </p>

                        <p>
                            Sambrela website
                            <br />
                            Why does Sambrela collect data from its website?
                            <br />
                            Like on most websites, when you browse on Sambrela.io certain
                            information about your connection and device(s) are automatically
                            collected for the website to operate properly.&nbsp;
                        </p>

                        <p>
                            Sambrela and its partners also use cookies and similar technologies to
                            analyze how our users interact with our services and administer the
                            website. Cookies are small text files stored on your browser that allow
                            the collection of non-personally identifiable information related to
                            your navigation on a website.&nbsp;
                        </p>

                        <p>
                            You can control the use of cookies in your browser settings but if you
                            choose to disable cookies it may affect certain websites&rsquo;
                            functionalities.
                        </p>

                        <p>
                            What data does Sambrela collect from its website?
                            <br />
                            For the purposes listed above the data that Sambrela and its partners
                            collect is limited to:
                        </p>

                        <p>
                            Browsing events and interactions with the website&rsquo;s contents and
                            services
                        </p>

                        <p>
                            Cookie identifiers, IP address and technical information related to your
                            browser and/or device (user agent)
                        </p>

                        <p>Information you provide us with voluntarily when you contact Sambrela</p>

                        <p>
                            Analytics and third party cookies
                            <br />
                            Sambrela uses Google Analytics to collect information related to the web
                            traffic on our website. This service allows us to measure the
                            performance and proper functioning of our website and to provide you
                            with a better experience. For more information on the data protection
                            and privacy aspects of these analytics services, you can refer to Google
                            specific policy accessible here:
                            <br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://policies.google.com/privacy?hl=fr"
                            >
                                https://policies.google.com/privacy?hl=fr
                            </a>
                            <br />
                            and opt-out from Google Analytics data collection here:
                            <br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://tools.google.com/dlpage/gaoptout"
                            >
                                https://tools.google.com/dlpage/gaoptout
                            </a>
                        </p>

                        <p>
                            Social networks and other communication tools
                            <br />
                            Our website also offers communication tools allowing users to share
                            content on social networks. When you interact with such social media
                            widgets or &ldquo;share buttons&rdquo;, these social network companies
                            may collect information about you and/or your device and connection.
                            your interactions with these services are governed by the respective
                            privacy policies of the companies providing these services. For more
                            information on the data protection and privacy practices of these
                            companies, you can refer to their specific policies listed below:
                        </p>

                        <p>
                            Facebook:
                            <br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.facebook.com/about/privacy/"
                            >
                                https://www.facebook.com/about/privacy/
                            </a>
                        </p>

                        <p>
                            Linkedin:
                            <br />
                            <a
                                className="text-cta/90 transition-colors duration-150 hover:text-cta/100"
                                target="_blank"
                                rel="noreferrer"
                                href="https://www.linkedin.com/legal/privacy-policy"
                            >
                                https://www.linkedin.com/legal/privacy-policy
                            </a>
                        </p>

                        <p>
                            Security and other important information
                            <br />
                            How long does Sambrela keep your data?
                            <br />
                            Personal data collected, received and processed for the purposes
                            described in this policy is not kept longer than necessary for the
                            purposes described above in this section.&nbsp;
                        </p>

                        <p>
                            In all cases, Sambrela does not retain such data for more than 13
                            months.
                        </p>

                        <p>
                            Children data
                            <br />
                            Sambrela never knowingly or willingly collect any personal data
                            concerning children under 16 years of age.
                        </p>

                        <p>
                            International transfers
                            <br />
                            Some of the partners and processors referred to in this policy are
                            located outside of the European Union.
                        </p>

                        <p>In such case, we ensure that:</p>

                        <p>
                            the personal data is transferred to countries recognized as offering an
                            equivalent level of protection or,
                        </p>

                        <p>
                            Personal data is transferred to certified entities under the Privacy
                            Shield or,
                        </p>

                        <p>
                            For personal data transferred outside of countries recognized by the
                            European Commission as having a sufficient level of protection, any of
                            the mechanisms offering appropriate guarantees is used, for which
                            provision is made by applicable regulations, and in particular the
                            adoption of the standard contractual clauses of the European Commission.
                        </p>

                        <p>
                            What rights do you have?
                            <br />
                            Consent withdrawal and opt-out of sale of information
                            <br />
                            You can change your consent status at any time from the Privacy Settings
                            available in Sambrela mobile games and applications.&nbsp;
                        </p>

                        <p>
                            Please note that if Sambrela does not sell the personal information of
                            its users, we may share it with third parties such as analytics and
                            advertising companies in order to improve and personalize your
                            experience and adapt the content and ads of our services.&nbsp;
                        </p>

                        <p>
                            Adjusting your consent settings within Sambrela apps and games, will
                            allow you to block the collection of data for these purposes and will de
                            facto prevent the sharing of information with our analytics and/or
                            advertising partners.
                        </p>

                        <p>
                            Access right
                            <br />
                            Upon request, Sambrela will provide you with information about whether
                            we hold any of your personal information. You may access or request
                            deletion of your personal information directly in Sambrela mobile apps
                            or by contacting Sambrela Data Protection Officer as indicated in the
                            &ldquo;Contact&rdquo; section below. We will respond to your request
                            within a reasonable timeframe.
                        </p>

                        <p>
                            Rectification and erasure
                            <br />
                            You may request Sambrela the rectification of inaccurate personal data
                            concerning you, as well as the completion of incomplete personal data.
                            You may also request Sambrela to erase without undue delay your personal
                            data when it is no longer necessary for Sambrela to retain such data.
                        </p>

                        <p>
                            In order for your data to be erased or rendered inaccessible you can
                            either:&nbsp;
                        </p>

                        <p>
                            reset your mobile advertising identifier (IDFA on iOS, GAAID on
                            Andro&iuml;d) or activate &ldquo;Limit Ad Tracking&rdquo; in your
                            device&rsquo; settings in order to make previously collected data non
                            linkable to you or your device anymore and limit further data collection
                            if you choose to enable the &ldquo;Limit Ad Tracking&rdquo; option
                        </p>

                        <p>
                            contact Sambrela Data Protection Officer, as indicated in the
                            &ldquo;Contact&rdquo; section below in order to have the data previously
                            collected by Sambrela on you and/or your device permanently erased or
                            anonymized
                        </p>

                        <p>
                            Portability
                            <br />
                            Upon request, Sambrela will provide you with the personal data that you
                            provided to us and, if possible, will communicate this information
                            directly to another data controller of your choice in a portable format
                            when the processing is based on consent or contract.
                        </p>
                    </body>
                </Container>
            </PageWrapper>
        </>
    )
}

export default Privacy
