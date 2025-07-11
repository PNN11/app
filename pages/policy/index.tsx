import { NextPage } from 'next'
import Link from 'next/link'

import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'

const Privacy: NextPage = () => {
    return (
        <PageWrapper>
            <Container>
                <div className="space-y-4">
                    <h1 className="mb-4 text-center text-3xl font-medium">PRIVACY POLICY</h1>

                    <div>
                        This privacy policy (“Policy”) describes how{' '}
                        <Link
                            className="text-link underline"
                            href={process.env.NEXT_PUBLIC_MAIN_URL}
                            target="_blank"
                        >
                            {process.env.NEXT_PUBLIC_MAIN_URL}
                        </Link>{' '}
                        (Or, “Arena Games Platform”, “us”, “we” or “our”) collects, protects, and
                        uses the personally identifiable information (“Personal Information”) you
                        (“User”, “you” or “your”) may provide on the Arena Games Platform website
                        and any of its products or services (collectively, “Website” or “Services”).
                        It also describes the choices available to you regarding our use of your
                        Personal Information and how you can access and update this information.
                        This Policy does not apply to the practices of companies that we do not own
                        or control, or to individuals that we do not employ or manage.
                    </div>

                    <div>
                        <span className="font-semibold">Automatic collection of information.</span>{' '}
                        When you visit the Website our servers automatically record information that
                        your browser sends. This data may include information such as your device’s
                        IP address, browser type and version, operating system type and version,
                        language preferences or the webpage you were visiting before you came to our
                        Website, pages of our Website that you visit, the time spent on those pages,
                        the information you search for on our Website, access times and dates, and
                        other statistics.
                        <br /> Collection of personal information. You can visit the Website without
                        telling us who you are or revealing any information by which someone could
                        identify you as a specific, identifiable individual. If, however, you wish
                        to use some of the Website’s features, you will be asked to provide certain
                        Personal Information (for example, your name and e-mail address). We receive
                        and store any information you knowingly provide to us when you fill any
                        online forms on the Website. You can choose not to provide us with your
                        personal information, but then you may not be able to take advantage of some
                        of the Website’s features. Users who are uncertain about what information is
                        mandatory are welcome to contact us.
                    </div>
                    <div>
                        <span className="font-semibold">
                            Use and processing of collected information.
                        </span>{' '}
                        Any of the information we collect from you may be used to personalize your
                        experience; improve our Website; improve customer service and respond to
                        queries and emails of our customers; send newsletters; send notification
                        emails such as password reminders, updates, etc; run and operate our Website
                        and Services. Information collected automatically is used only to identify
                        potential cases of abuse and establish statistical information regarding
                        Website usage. This statistical information is not otherwise aggregated in
                        such a way that would identify any particular user of the system.
                        <br /> We may process Personal Information related to you if one of the
                        following applies:
                        <ul>
                            <li>
                                (i) You have given your consent for one or more specific purposes.
                                Note that under some legislations we may be allowed to process
                                information until you object to such processing (by opting out),
                                without having to rely on consent or any other of the following
                                legal bases below. This, however, does not apply, whenever the
                                processing of Personal Information is subject to European data
                                protection law;
                            </li>{' '}
                            <li>
                                (ii) Provision of information is necessary for the performance of an
                                agreement with you and/or for any pre-contractual obligations
                                thereof;
                            </li>
                            <li>
                                (iii) Processing is necessary for compliance with a legal obligation
                                to which you are subject;
                            </li>{' '}
                            <li>
                                (iv) Processing is related to a task that is carried out in the
                                public interest or in the exercise of official authority vested in
                                us;
                            </li>{' '}
                            <li>
                                (v) Processing is necessary for the purposes of the legitimate
                                interests pursued by us or by a third party. In any case, we will be
                                happy to clarify the specific legal basis that applies to the
                                processing, and in particular whether the provision of Personal
                                Information is a statutory or contractual requirement, or a
                                requirement necessary to enter into a contract.
                            </li>
                        </ul>
                        Information transfer and storage. Depending on your location, data transfers
                        may involve transferring and storing your information in a country other
                        than your own. You are entitled to learn about the legal basis of
                        information transfers to a country outside the European Union or to any
                        international organization governed by public international law or set up by
                        two or more countries, such as the UN, and about the security measures taken
                        by us to safeguard your information. If any such transfer takes place, you
                        can find out more by checking the relevant sections of this document or
                        inquire with us using the information provided in the contact section.
                        <br /> The rights of users. You may exercise certain rights regarding your
                        information processed by us. In particular, you have the right to do the
                        following:
                        <ul>
                            <li>
                                (i) you have the right to withdraw consent where you have previously
                                given your consent to the processing of your information;
                            </li>{' '}
                            <li>
                                (ii) you have the right to object to the processing of your
                                information if the processing is carried out on a legal basis other
                                than consent;
                            </li>
                            <li>
                                (iii) you have the right to learn if the information is being
                                processed by us, obtain disclosure regarding certain aspects of the
                                processing, and obtain a copy of the information undergoing
                                processing;
                            </li>{' '}
                            <li>
                                (iv) you have the right to verify the accuracy of your information
                                and ask for it to be updated or corrected;
                            </li>{' '}
                            <li>
                                (v) you have the right, under certain circumstances, to restrict the
                                processing of your information, in which case, we will not process
                                your information for any purpose other than storing it;
                            </li>{' '}
                            <li>
                                (vi) you have the right, under certain circumstances, to obtain the
                                erasure of your Personal Information from us;
                            </li>{' '}
                            <li>
                                (vii) you have the right to receive your information in a
                                structured, commonly used and machine-readable format and, if
                                technically feasible, to have it transmitted to another controller
                                without any hindrance.
                            </li>
                        </ul>
                    </div>
                    <div>
                        This provision is applicable provided that your information is processed by
                        automated means and that the processing is based on your consent, on a
                        contract which you are part of, or on pre-contractual obligations thereof.
                        <br />
                        The right to object to processing. Where Personal Information is processed
                        for the public interest, in the exercise of an official authority vested in
                        us, or for the purposes of the legitimate interests pursued by us, you may
                        object to such processing by providing a ground related to your particular
                        situation to justify the objection.
                        <br /> You must know that, however, should your Personal Information be
                        processed for direct marketing purposes, you can object to that processing
                        at any time without providing any justification. To learn, whether we are
                        processing Personal Information for direct marketing purposes, you may refer
                        to the relevant sections of this document. You must know that, however,
                        should your Personal Information be processed for direct marketing purposes,
                        you can object to that processing at any time without providing any
                        justification. To learn, whether we are processing Personal Information for
                        direct marketing purposes, you may refer to the relevant sections of this
                        document. How to exercise these rights. Any requests to exercise User rights
                        can be directed to the Owner through the contact details provided in this
                        document. These requests can be exercised free of charge and will be
                        addressed by the Owner as early as possible. Privacy of children. We do not
                        knowingly collect any Personal Information from children under the age of
                        13. If you are under the age of 13, please do not submit any Personal
                        Information through our Website or Service. We encourage parents and legal
                        guardians to monitor their children’s Internet usage and to help enforce
                        this Policy by instructing their children never to provide Personal
                        Information through our Website or Service without their permission. If you
                        have reason to believe that a child under the age of 13 has provided
                        Personal Information to us through our Website or Service, please contact
                        us. You must also be at least 16 years of age to consent to the processing
                        of your Personal Information in your country (in some countries we may allow
                        your parent or guardian to do so on your behalf).
                        <br /> Newsletters. We offer electronic newsletters to which you may
                        voluntarily subscribe at any time. You may choose to stop receiving our
                        newsletter or marketing emails by following the unsubscribe instructions
                        included in these emails or by contacting us. Cookies. The Website uses
                        “cookies” to help personalize your online experience. A cookie is a text
                        file that is placed on your hard disk by a web page server. Cookies cannot
                        be used to run programs or deliver viruses to your computer. Cookies are
                        uniquely assigned to you, and can only be read by a web server in the domain
                        that issued the cookie to you. We may use cookies to collect, store, and
                        track information for statistical purposes to operate our Website and
                        Services. You have the ability to accept or decline cookies. Most web
                        browsers automatically accept cookies, but you can usually modify your
                        browser setting to decline cookies if you prefer. To learn more about
                        cookies and how to manage them, visit internetcookies.org In addition to
                        using cookies and related technologies as described above, we also may
                        permit certain third-party companies to help us tailor advertising that we
                        think may be of interest to users and to collect and use other data about
                        user activities on the Website. These companies may deliver ads that might
                        also place cookies and otherwise track user behavior.
                        <br /> <span className="font-semibold">Do Not Track signals.</span>
                        Some browsers incorporate a Do Not Track feature that signals to websites
                        you visit that you do not want to have your online activity tracked.
                        Tracking is not the same as using or collecting information in connection
                        with a website. For these purposes, tracking refers to collecting personally
                        identifiable information from consumers who use or visit a website or online
                        service as they move across different websites over time. How browsers
                        communicate the Do Not Track signal is not yet uniform. As a result, this
                        Website is not yet set up to interpret or respond to Do Not Track signals
                        communicated by your browser. Even so, as described in more detail
                        throughout this Policy, we limit our use and collection of your personal
                        information.
                        <br /> Advertisement. We may display online advertisements and we may share
                        aggregated and non-identifying information about our customers that we
                        collect through the registration process or through online surveys and
                        promotions with certain advertisers. We do not share personally identifiable
                        information about individual customers with advertisers. In some instances,
                        we may use this aggregated and non-identifying information to deliver
                        tailored advertisements to the intended audience.
                        <br /> Affiliates. We may disclose information about you to our affiliates
                        for the purpose of being able to offer you related or additional products
                        and services. Any information relating to you that we provide to our
                        affiliates will be treated by those affiliates in accordance with the terms
                        of this Privacy Policy.
                        <br /> Links to other websites. Our Website contains links to other websites
                        that are not owned or controlled by us. Please be aware that we are not
                        responsible for the privacy practices of such other websites or third
                        parties. We encourage you to be aware when you leave our Website and to read
                        the privacy statements of each and every website that may collect Personal
                        Information.
                        <br /> Information security. We secure information you provide on computer
                        servers in a controlled, secure environment, protected from unauthorized
                        access, use, or disclosure. We maintain reasonable administrative,
                        technical, and physical safeguards in an effort to protect against
                        unauthorized access, use, modification, and disclosure of Personal
                        Information in its control and custody. However, no data transmission over
                        the Internet or wireless network can be guaranteed. Therefore, while we
                        strive to protect your Personal Information, you acknowledge that (i) there
                        are security and privacy limitations of the internet which are beyond our
                        control; (ii) the security, integrity, and privacy of any and all
                        information and data exchanged between you and our Website cannot be
                        guaranteed; and (iii) any such information and data may be viewed or
                        tampered with in transit by a third-party, despite best efforts.
                        <br /> Data breach. In the event we become aware that the security of the
                        Website has been compromised or users Personal Information has been
                        disclosed to unrelated third parties as a result of external activity,
                        including, but not limited to, security attacks or fraud, we reserve the
                        right to take reasonably appropriate measures, including, but not limited
                        to, investigation and reporting, as well as notification to and cooperation
                        with law enforcement authorities. In the event of a data breach, we will
                        make reasonable efforts to notify affected individuals if we believe that
                        there is a reasonable risk of harm to the user as a result of the breach or
                        if notice is otherwise required by law. When we do, we will post a notice on
                        the Website.
                        <br /> Legal disclosure. We will disclose any information we collect, use or
                        receive if required or permitted by law, such as to comply with a subpoena
                        or similar legal process, and when we believe in good faith that disclosure
                        is necessary to protect our rights, protect your safety or the safety of
                        others, investigate fraud, or respond to a government request. In the event,
                        we go through a business transition, such as a merger or acquisition by
                        another company, or sale of all or a portion of its assets, your user
                        account, and Personal Information will likely be among the assets
                        transferred.
                        <br /> Changes and amendments. We may update this Privacy Policy from time
                        to time at our discretion and will notify you of any material changes to the
                        way in which we treat Personal Information. When changes are made, we will
                        revise the updated date at the bottom of this page. We may also provide
                        notice to you in other ways at our discretion, such as through the contact
                        information you have provided. Any updated version of this Privacy Policy
                        will be effective immediately upon the posting of the revised Privacy Policy
                        unless otherwise specified. Your continued use of the Website or Services
                        after the effective date of the revised Privacy Policy (or such other act
                        specified at that time) will constitute your consent to those changes.
                        However, we will not, without your consent, use your Personal Data in a
                        manner materially different than what was stated at the time your Personal
                        Data was collected.
                    </div>
                    <div>
                        <h5 className="font-semibold">Acceptance of this policy</h5>
                        You acknowledge that you have read this Policy and agree to all its terms
                        and conditions. By using the Website or its Services you agree to be bound
                        by this Policy. If you do not agree to abide by the terms of this Policy,
                        you are not authorized to use or access the Website and its Services.
                        <br />
                        Contacting us.
                        <br /> If you would like to contact us to understand more about this Policy
                        or wish to contact us concerning any matter relating to individual rights
                        and your Personal Information, you may do so via{' '}
                        <Link
                            className="text-link underline"
                            href={`mailto:${process.env.NEXT_PUBLIC_MAIL_URL}`}
                        >
                            {process.env.NEXT_PUBLIC_MAIL_URL}.
                        </Link>
                    </div>
                </div>
            </Container>
        </PageWrapper>
    )
}

export default Privacy
