import React from 'react';
import { Card, Image } from 'semantic-ui-react'

class About extends React.Component {
    render() {
        return (
        <div className="pageCont">
            <Card>
                <Image src='http://i.imgur.com/IHOKglT.jpg' />
                <Card.Content>
                    <Card.Header>
                        Emily Yang
                    </Card.Header>
                    <Card.Meta>
                        <span className='title'>
                            Developer
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        "What do you mean?"
                    </Card.Description>
                </Card.Content>
            </Card>
            <Card>
                <Image src='http://i.imgur.com/OeefFsX.jpg' />
                <Card.Content>
                    <Card.Header>
                        Brandon Kleiman
                    </Card.Header>
                    <Card.Meta>
                        <span className='title'>
                            Developer & Scrum Lord
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        "I cried three times during <span style={{fontStyle: 'italic'}}>Ferris Bueller's Day Off</span>. In the past 31 years of cinema, no one has even come close to matching the ambition and vision of John Hughes' feel-good masterpiece. I've already seen the only truly great work of art out there, and the only way I can deal with this fact is to clear my mind through running."
                    </Card.Description>
                </Card.Content>
            </Card>
            <Card>
                <Image src='https://scontent-dft4-2.xx.fbcdn.net/v/t1.0-9/17799446_10155257756098593_1867308761315750281_n.jpg?oh=eb1b935c95284c31f14aed34b6b9e29d&oe=5988BA0A' />
                <Card.Content>
                    <Card.Header>
                        Marcie Anderson
                    </Card.Header>
                    <Card.Meta>
                        <span className='title'>
                            Developer
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        "Yeah, I love tedium and death."
                    </Card.Description>
                </Card.Content>
            </Card>
            <Card>
                <Image src='http://i.imgur.com/ntnQndc.jpg' />
                <Card.Content>
                    <Card.Header>
                        Zach Carr
                    </Card.Header>
                    <Card.Meta>
                        <span className='title'>
                            Developer & Project Manager
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        "Ohana means family, and family means no one gets left behind."
                    </Card.Description>
                </Card.Content>
            </Card>
        </div>
        )
    }
}

export default About