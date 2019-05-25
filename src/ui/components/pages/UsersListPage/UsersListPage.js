import React from 'react';
import {AuthLayout} from "../../common/AuthLayout/";
import {Loader} from "../../common/Loader";
import {Block, Card, styled} from "@qiwi/pijma-core"
import {Heading, Paragraph, Text} from "@qiwi/pijma-desktop";


const FluidTable = styled('table')`
    width: 100%
`;
const Row = styled.tr`
    border-bottom: 1px solid ${(props) => props.theme.color.gray.lightest}
`;
const HeaderRow = styled.tr`
    font-weight: 500;
    font-weight: bold;
    border-bottom: 2px solid ${(props) => props.theme.color.gray.light};
`;

const Cell = styled.td`
    padding: 10px
`;
const CellRight = styled.td`
    padding: 10px;
    text-align: right
`;
const CellCenterMuted = styled.td`
    color: ${(props) => props.theme.color.gray.darkest};
    padding: 10px;
    text-align: center;
`;

const EmptyRowHolder = (props) => (
    <Row>
        <CellCenterMuted {...props}/>
    </Row>
);

const UserRow = (user) => (
    <Row key={user.idUser}>
        <CellRight>{user.idUser}</CellRight>
        <Cell>{user.userName}</Cell>
        <Cell>{user.userEmail}</Cell>
    </Row>
);

export class UsersListPage extends React.Component {

    render() {
        console.log(this.props.users);
        return (
            <AuthLayout>
                <Heading size="1">Пользователи</Heading>

                <Block>
                    {
                        this.props.isFetching ?
                            <Loader/>
                            :

                            this.props.isErrored ?
                                <Card p={3}>
                                    <Text size="l" bold color="failure">{this.props.getErrorMessage}</Text>
                                </Card>
                                :

                                <FluidTable>
                                    <thead>
                                    <HeaderRow>
                                        <CellRight>id</CellRight>
                                        <Cell>Имя</Cell>
                                        <Cell>Email</Cell>
                                    </HeaderRow>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.users.length === 0 &&
                                        <EmptyRowHolder colSpan={3}>
                                            <Paragraph bold color="support">Пользователей нет</Paragraph>
                                        </EmptyRowHolder>
                                    }
                                    {
                                        this.props.users.map(UserRow)
                                    }
                                    </tbody>
                                </FluidTable>
                    }
                </Block>
            </AuthLayout>
        );
    }


    componentDidMount() {
        if (this.props.isInitial || this.props.isErrored) this.props.fetch();
    }

}
