import { NextPage } from 'next'
import Link from 'next/link'

import { Container } from 'components/common/wrappers/container'
import PageWrapper from 'components/common/wrappers/pageWrapper'

const Terms: NextPage = () => {
    return (
        <PageWrapper>
            <Container>
                <div className="space-y-4">
                    <h1 className="mb-4 text-center text-3xl font-medium"> TERMS AND CONDITIONS</h1>
                    <div>
                        These terms and conditions (“Terms”, “Agreement”) are an agreement between{' '}
                        <Link
                            className="text-link underline"
                            href={process.env.NEXT_PUBLIC_MAIN_URL}
                            target="_blank"
                        >
                            {process.env.NEXT_PUBLIC_MAIN_URL}
                        </Link>{' '}
                        (Or, “Arena Games Platform”, “us”, “we” or “our”) and you (“User”, “you” or
                        “your”). This Agreement sets forth the general terms and conditions of your
                        use of the{' '}
                        <Link
                            className="text-link underline"
                            href={process.env.NEXT_PUBLIC_MAIN_URL}
                            target="_blank"
                        >
                            {process.env.NEXT_PUBLIC_MAIN_URL}
                        </Link>{' '}
                        website and any of its products or services (collectively, “Website” or
                        “Services”).
                    </div>
                    <div>
                        <span className="font-semibold">Backups.</span> We are not responsible for
                        Content residing on the Website. In no event shall we be held liable for any
                        loss of any Content. It is your sole responsibility to maintain the
                        appropriate backup of your Content. Notwithstanding the foregoing, on some
                        occasions and in certain circumstances, with absolutely no obligation, we
                        may be able to restore some or all of your data that has been deleted as of
                        a certain date and time when we may have backed up data for our own
                        purposes. We make no guarantee that the data you need will be available.
                    </div>
                    <div>
                        <span className="font-semibold">Advertisements.</span> During the use of the
                        Website, you may enter into correspondence with or participate in promotions
                        of advertisers or sponsors showing their goods or services through the
                        Website. Any such activity, and any terms, conditions, warranties or
                        representations associated with such activity, is solely between you and the
                        applicable third-party. We shall have no liability, obligation, or
                        responsibility for any such correspondence, purchase or promotion between
                        you and any such third-party.
                    </div>
                    <div>
                        <span className="font-semibold">Links to other websites.</span> Although
                        this Website may link to other websites, we are not, directly or indirectly,
                        implying any approval, association, sponsorship, endorsement, or affiliation
                        with any linked website, unless specifically stated herein. Some of the
                        links on the Website may be “affiliate links”. This means if you click on
                        the link and purchase an item, Ready Games Network will receive an affiliate
                        commission. We are not responsible for examining or evaluating, and we do
                        not warrant the offerings of, any businesses or individuals or the content
                        of their websites. We do not assume any responsibility or liability for the
                        actions, products, services, and content of any other third-parties. You
                        should carefully review the legal statements and other conditions of use of
                        any website which you access through a link from this Website. Your linking
                        to any other off-site websites is at your own risk.
                    </div>
                    <div>
                        <span className="font-semibold">Intellectual property rights.</span> This
                        Agreement does not transfer to you any intellectual property owned by Arena
                        Games Platform or third-parties, and all rights, titles, and interests in
                        and to such property will remain (as between the parties) solely with Arena
                        Games Platform. All trademarks, service marks, graphics, and logos used in
                        connection with our Website or Services are trademarks or registered
                        trademarks of Arena Games Platform or Arena Games Platform licensors. Other
                        trademarks, service marks, graphics, and logos used in connection with our
                        Website or Services may be the trademarks of other third-parties. Your use
                        of our Website and Services grants you no right or license to reproduce or
                        otherwise use any Arena Games Platform or third-party trademarks.
                    </div>
                    <div>
                        <span className="font-semibold">Indemnification.</span> You agree to
                        indemnify and hold Arena Games Platform and its affiliates, directors,
                        officers, employees, and agents harmless from and against any liabilities,
                        losses, damages or costs, including reasonable attorneys’ fees, incurred in
                        connection with or arising from any third-party allegations, claims,
                        actions, disputes, or demands asserted against any of them as a result of or
                        relating to your Content, your use of the Website or Services or any willful
                        misconduct on your part.
                        <br /> Severability. All rights and restrictions contained in this Agreement
                        may be exercised and shall be applicable and binding only to the extent that
                        they do not violate any applicable laws and are intended to be limited to
                        the extent necessary so that they will not render this Agreement illegal,
                        invalid or unenforceable. If any provision or portion of any provision of
                        this Agreement shall be held to be illegal, invalid or unenforceable by a
                        court of competent jurisdiction, it is the intention of the parties that the
                        remaining provisions or portions thereof shall constitute their agreement
                        with respect to the subject matter hereof, and all such remaining provisions
                        or portions thereof shall remain in full force and effect.
                    </div>
                    <div>
                        <span className="font-semibold">Changes and amendments.</span> We reserve
                        the right to modify this Agreement or its policies relating to the Website
                        or Services at any time, effective upon posting of an updated version of
                        this Agreement on the Website. When we do, we will revise the updated date
                        at the bottom of this page. Continued use of the Website after any such
                        changes shall constitute your consent to such changes.
                    </div>
                    <div>
                        <span className="font-semibold">Acceptance of these terms.</span> You
                        acknowledge that you have read this Agreement and agree to all its terms and
                        conditions. By using the Website or its Services you agree to be bound by
                        this Agreement. If you do not agree to abide by the terms of this Agreement,
                        you are not authorized to use or access the Website and its Services.
                    </div>
                    <div>
                        <span className="font-semibold">Contacting us.</span> If you would like to
                        contact us to understand more about this Agreement or wish to contact us
                        concerning any matter relating to it, you may do so via{' '}
                        <Link
                            className="text-link underline"
                            href={`mailto:${process.env.NEXT_PUBLIC_MAIL_URL}`}
                        >
                            {process.env.NEXT_PUBLIC_MAIL_URL}.
                        </Link>
                    </div>
                    <div>This document was last updated on 15.01.23.</div>
                </div>
            </Container>
        </PageWrapper>
    )
}

export default Terms
