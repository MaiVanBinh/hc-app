import React from 'react';
import Modal from '../../components/UI/Modal/Model';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component{
        state = {
            error: null
        };
        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(response => response, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorComfirmedHandler = () => {
            this.setState({error: null});
        }
        render() {
            return(
                <Aux>
                    <Modal show={this.state.error ? true : false} BackdropClicked={this.errorComfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
        
    }
}

export default withErrorHandler;