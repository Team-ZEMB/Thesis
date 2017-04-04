import React from 'react'
import { Card, Icon, Feed } from 'semantic-ui-react'

const StatsCard = () => (
    <Card>
        <Card.Content>
        <Card.Header>
            Statistics
        </Card.Header>
        </Card.Content>
        <Card.Content>
        <Feed>
            <Feed.Event>
            <Feed.Content>
                <Feed.Date content='Most recent run' />
                <Feed.Summary>
                You last ran <a>2.3 miles</a> in <a>21:40</a> on <a>April 4th</a>.
                </Feed.Summary>
            </Feed.Content>
            </Feed.Event>
            <Feed.Event>
            <Feed.Content>
                <Feed.Date content='Average mile time' />
                <Feed.Summary>
                You averaged <a>7:29</a> a mile last week.
                </Feed.Summary>
            </Feed.Content>
            </Feed.Event>
            <Feed.Event>
            <Feed.Content>
                <Feed.Date content='Total miles run' />
                <Feed.Summary>
                You've run <a>42.1 miles</a> since you joined Rabbit!
                </Feed.Summary>
            </Feed.Content>
            </Feed.Event>
        </Feed>
        </Card.Content>
    </Card>
)

export default StatsCard